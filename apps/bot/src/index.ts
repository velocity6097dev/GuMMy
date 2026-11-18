import { Client, GatewayIntentBits, Events } from "discord.js";
import { env, validateEnv } from "@gummy/config";
import { verifyConnection, closeDb } from "@gummy/database";

/**
 * PHASE 1 SCOPE ONLY.
 *
 * This file intentionally does NOT implement sticky messages, moderation,
 * or anything from later phases. Its only job is to prove the foundation
 * works end-to-end:
 *   1. Required env vars are present.
 *   2. The bot can actually authenticate with Discord's Gateway.
 *   3. The bot can actually run a query against Turso.
 *
 * Both checks report their REAL result - per CLAUDE.md section 2.3, this
 * must never claim a connection works without verifying it.
 */

async function main(): Promise<void> {
  validateEnv(["DISCORD_BOT_TOKEN", "DISCORD_CLIENT_ID", "TURSO_DATABASE_URL", "TURSO_AUTH_TOKEN"]);

  console.log(`[${env.brandName}] Checking database connectivity...`);
  const db = await verifyConnection();
  if (!db.ok) {
    console.error(`[${env.brandName}] Database check FAILED: ${db.error}`);
    console.error("Bot will not start until the database connection works. Check TURSO_DATABASE_URL / TURSO_AUTH_TOKEN.");
    process.exit(1);
  }
  console.log(`[${env.brandName}] Database check OK: ${db.message}`);

  // Least-privilege intents for Phase 1 - only what's needed to log in and
  // see guild count. Message-related intents are added in Phase 2 when the
  // sticky feature actually needs them, and only after explicit approval
  // for any privileged Gateway intent (CLAUDE.md section 13).
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  client.once(Events.ClientReady, (readyClient) => {
    console.log(`[${env.brandName}] Logged in as ${readyClient.user.tag}`);
    console.log(`[${env.brandName}] Shard: ${readyClient.shard?.ids?.join(",") ?? "0"} (single-shard mode)`);
    console.log(`[${env.brandName}] Guild count: ${readyClient.guilds.cache.size}`);
  });

  client.on(Events.Error, (error) => {
    console.error(`[${env.brandName}] Discord client error:`, error.message);
  });

  process.on("SIGINT", async () => {
    console.log(`\n[${env.brandName}] Shutting down...`);
    client.destroy();
    await closeDb();
    process.exit(0);
  });

  await client.login(env.discord.botToken);
}

main().catch((err) => {
  console.error("Fatal startup error:", err instanceof Error ? err.message : err);
  process.exit(1);
});
