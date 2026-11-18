-- Migration 0001: initial `plans` table.
-- Plans/prices/limits must live in the database, not hardcoded in app code
-- (CLAUDE.md section 6). This table is the single source of truth; the
-- values in packages/config/src/planSeed.ts are only used once to populate
-- a fresh database (see packages/database/src/seedPlans.ts).

CREATE TABLE IF NOT EXISTS plans (
  key                      TEXT PRIMARY KEY,
  name                     TEXT NOT NULL,
  price_inr_per_month      INTEGER,           -- NULL = custom/enterprise pricing
  max_servers              INTEGER,           -- NULL = unlimited/custom
  max_stickies_per_server  INTEGER,           -- NULL = unlimited
  created_at               TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at               TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
