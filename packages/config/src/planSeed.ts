/**
 * PHASE 1 NOTE — this is a seed, not a source of truth.
 *
 * CLAUDE.md section 6 requires plans/prices/limits to be database-driven and
 * never hardcoded across multiple files. This object exists ONLY so the
 * Phase 1 migration has something to insert into the `plans` table the first
 * time a fresh database is set up. Once the `subscriptions` package
 * (Phase 7) exists, the bot/API must always read plan limits from the
 * `plans` table — never import this file for runtime logic.
 *
 * Prices and limits below are the proposals from CLAUDE.md section 6 and are
 * NOT final business decisions.
 */
export const PLAN_SEED = [
  {
    key: "free",
    name: "Free",
    priceInrPerMonth: 0,
    maxServers: 5,
    maxStickiesPerServer: 2,
  },
  {
    key: "pro",
    name: "Pro",
    priceInrPerMonth: 149,
    maxServers: 10,
    maxStickiesPerServer: 20,
  },
  {
    key: "premium",
    name: "Premium",
    priceInrPerMonth: 299,
    maxServers: 50,
    maxStickiesPerServer: null, // unlimited, subject to fair use
  },
  {
    key: "enterprise",
    name: "Enterprise",
    priceInrPerMonth: null, // custom pricing
    maxServers: null, // custom
    maxStickiesPerServer: null,
  },
] as const;
