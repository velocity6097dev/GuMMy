# GuMMy — Discord Bot Platform (working name, not final branding)

A modular Discord bot platform: bot, API, public site, user dashboard and
owner admin panel, sharing one monorepo and one database access layer.
Built against `CLAUDE.md` as the project specification — read that file
first for full requirements, phases and rules.

**Current status:** Phase 1 (foundation) complete and verified by typecheck.
Not yet verified against a real Discord bot token or real Turso database —
see `docs/ROADMAP.md` for exact status and `docs/INSTALLATION.md` to run it
yourself.

## Layout
```
apps/bot/          Discord bot (Phase 1: login + DB check only)
packages/config/   Centralised env access + plan seed data
packages/shared/   Cross-package TypeScript types
packages/database/ Turso/libSQL client, migrations, seed scripts
docs/              Setup guides and phase status
```

## Quick start
See `docs/INSTALLATION.md`.
