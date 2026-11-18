# Database Setup (Turso)

Claude cannot create a Turso database for you — it requires your own account,
and this sandbox has no network access to Turso's cloud endpoints to verify
it even if it could. Do this on your own machine.

## 1. Install the Turso CLI and create a database

Follow the official quickstart (verify current steps/pricing before relying
on this, limits change): https://docs.turso.tech/quickstart and
https://turso.tech/pricing

Roughly:
```bash
curl -sSfL https://get.tur.so/install.sh | bash
turso auth login
turso db create gummy-dev
turso db show gummy-dev --url
turso db tokens create gummy-dev
```

Put the URL and token into your local `.env`:
```
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=...
```

## 2. Run migrations

From the repo root:
```bash
pnpm --filter @gummy/database run migrate
```
This creates the `_migrations` tracking table and runs any `.sql` file in
`packages/database/migrations/` that hasn't been applied yet, in filename
order. It is safe to run repeatedly — already-applied files are skipped.

## 3. Seed the initial plans

```bash
pnpm --filter @gummy/database exec tsx src/seedPlans.ts
```
Inserts the Free/Pro/Premium/Enterprise rows from
`packages/config/src/planSeed.ts` **only if they don't already exist**. This
is a one-time convenience, not the system of record — once the admin panel
(Phase 6/7) exists, plan edits happen through the database, not this file.

## Current schema (Phase 1)

| Table | Purpose |
|---|---|
| `_migrations` | Tracks which migration files have run. |
| `plans` | Free/Pro/Premium/Enterprise definitions — source of truth for limits & pricing. |

**Not created yet (pending, by design — see ROADMAP.md):** `stickies`,
`guilds`, `subscriptions`, `payments`, `audit_logs`. These arrive with the
phases that actually use them.
