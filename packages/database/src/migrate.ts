import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { getDb, closeDb } from "./client.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.resolve(__dirname, "..", "migrations");

async function ensureMigrationsTable(): Promise<void> {
  const db = getDb();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS _migrations (
      filename   TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    )
  `);
}

async function appliedMigrations(): Promise<Set<string>> {
  const db = getDb();
  const result = await db.execute("SELECT filename FROM _migrations");
  return new Set(result.rows.map((r) => String(r["filename"])));
}

export async function runMigrations(): Promise<{ applied: string[]; skipped: string[] }> {
  await ensureMigrationsTable();
  const already = await appliedMigrations();

  const entries = await readdir(MIGRATIONS_DIR);
  const files = entries.filter((f) => f.endsWith(".sql")).sort();

  const applied: string[] = [];
  const skipped: string[] = [];
  const db = getDb();

  for (const file of files) {
    if (already.has(file)) {
      skipped.push(file);
      continue;
    }
    const sql = await readFile(path.join(MIGRATIONS_DIR, file), "utf8");
    // executeMultiple hands the whole script to libSQL's own SQL parser,
    // which correctly handles comments, strings and multiple statements.
    // (An earlier version of this file naively split on ";" in JS, which
    // broke the moment a comment or string contained a semicolon - never
    // do that; let the database parse its own SQL.)
    await db.executeMultiple(sql);
    await db.execute({
      sql: "INSERT INTO _migrations (filename) VALUES (?)",
      args: [file],
    });
    applied.push(file);
  }

  return { applied, skipped };
}

// Allow running directly: `pnpm --filter @gummy/database run migrate`
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain) {
  runMigrations()
    .then(({ applied, skipped }) => {
      console.log(`Migrations applied: ${applied.length ? applied.join(", ") : "(none)"}`);
      console.log(`Migrations already up to date: ${skipped.length ? skipped.join(", ") : "(none)"}`);
      return closeDb();
    })
    .catch((err) => {
      console.error("Migration failed:", err instanceof Error ? err.message : err);
      process.exitCode = 1;
    });
}
