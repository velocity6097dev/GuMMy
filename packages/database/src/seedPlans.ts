import { PLAN_SEED } from "@gummy/config";
import { getDb, closeDb } from "./client.js";
import { fileURLToPath } from "node:url";
import path from "node:path";

/**
 * Idempotent: safe to run multiple times. Only inserts a plan if its key
 * does not already exist, so it never clobbers values an admin has since
 * changed through the (future) admin panel.
 */
export async function seedPlans(): Promise<{ inserted: string[]; skipped: string[] }> {
  const db = getDb();
  const inserted: string[] = [];
  const skipped: string[] = [];

  for (const plan of PLAN_SEED) {
    const existing = await db.execute({
      sql: "SELECT key FROM plans WHERE key = ?",
      args: [plan.key],
    });
    if (existing.rows.length > 0) {
      skipped.push(plan.key);
      continue;
    }
    await db.execute({
      sql: `INSERT INTO plans (key, name, price_inr_per_month, max_servers, max_stickies_per_server)
            VALUES (?, ?, ?, ?, ?)`,
      args: [plan.key, plan.name, plan.priceInrPerMonth, plan.maxServers, plan.maxStickiesPerServer],
    });
    inserted.push(plan.key);
  }

  return { inserted, skipped };
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain) {
  seedPlans()
    .then(({ inserted, skipped }) => {
      console.log(`Plans inserted: ${inserted.length ? inserted.join(", ") : "(none)"}`);
      console.log(`Plans already present: ${skipped.length ? skipped.join(", ") : "(none)"}`);
      return closeDb();
    })
    .catch((err) => {
      console.error("Seeding failed:", err instanceof Error ? err.message : err);
      process.exitCode = 1;
    });
}
