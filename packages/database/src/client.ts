import { createClient, type Client } from "@libsql/client";
import { env } from "@gummy/config";

/**
 * Centralised database access (CLAUDE.md section 4 & 12).
 *
 * Nothing outside this package should call `createClient` directly or hold
 * its own connection. Repository/service modules import `getDb()` from
 * here. This also means that if Turso's connection details or client
 * package ever change, only this file needs to change.
 *
 * Lazily constructed: importing this module must never throw just because
 * env vars aren't set yet (e.g. during a typecheck or a test that mocks the
 * DB). The error only surfaces when a query actually runs.
 */
let client: Client | null = null;

export function getDb(): Client {
  if (!client) {
    client = createClient({
      url: env.turso.databaseUrl,
      authToken: env.turso.authToken,
    });
  }
  return client;
}

/**
 * Explicit connectivity check. CLAUDE.md section 2.3 forbids "pretending" a
 * database connection works, so Phase 1 must actually run a trivial query
 * and report the real result rather than assuming success.
 */
export async function verifyConnection(): Promise<
  { ok: true; message: string } | { ok: false; error: string }
> {
  try {
    const db = getDb();
    const result = await db.execute("SELECT 1 AS ok");
    const row = result.rows[0];
    if (row && Number(row["ok"]) === 1) {
      return { ok: true, message: "Connected to Turso and executed a test query successfully." };
    }
    return { ok: false, error: "Query ran but returned an unexpected result." };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Unknown error connecting to Turso.",
    };
  }
}

export async function closeDb(): Promise<void> {
  if (client) {
    client.close();
    client = null;
  }
}
