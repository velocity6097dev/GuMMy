# Roadmap / Phase Status

Phases follow CLAUDE.md section 16. Status is kept honest on purpose —
nothing here is marked done unless it was actually built and verified.

## Phase 1 — Project Foundation: **DONE (this session)**
- [x] pnpm monorepo (`apps/*`, `packages/*`)
- [x] Shared TypeScript config via project references
- [x] `packages/config` — centralised env loading, no brand name hardcoded
- [x] `packages/shared` — cross-package types (incl. `StickyMessage` shape
      for Phase 2, not yet backed by a table)
- [x] `packages/database` — centralised Turso/libSQL client, migration
      runner, `plans` table + seed script
- [x] `apps/bot` — logs in with least-privilege intents, verifies DB
      connectivity before doing anything else, fails loudly and honestly
      if either check fails
- [x] Full workspace builds and typechecks cleanly (`pnpm -r run typecheck`)
- [ ] **Verified against a real Discord bot token and a real Turso
      database** — NOT done. This requires your own credentials and was not
      possible to verify from this environment. Follow `INSTALLATION.md`
      and report back what you see.

## Phase 2 — Sticky Message System: **NOT STARTED**
Commands, sticky service, refresh/debounce logic, restart recovery, the
`stickies` table/migration. `StickyMessage` type already exists in
`packages/shared` so Phase 2 doesn't need to redesign the shape.

## Phase 3–8: **NOT STARTED**
Backend API, public website, user dashboard, owner admin panel,
monetisation, moderation/logging expansion — all as scoped in CLAUDE.md.
None of this exists yet; nothing should claim otherwise.
