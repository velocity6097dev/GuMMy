# Installation (Phase 1)

## Prerequisites
- Node.js 20+ (this project was built/tested against Node 22)
- pnpm (`npm install -g pnpm`)
- A Discord application + bot token — see `DISCORD_APPLICATION.md`
- A Turso database + auth token — see `DATABASE.md`

## Steps

```bash
# 1. Install dependencies for every workspace package
pnpm install

# 2. Create your real env file
cp .env.example .env
# then edit .env and fill in DISCORD_BOT_TOKEN, DISCORD_CLIENT_ID,
# TURSO_DATABASE_URL, TURSO_AUTH_TOKEN

# 3. Build everything (also typechecks every package)
pnpm run build

# 4. Set up the database
pnpm --filter @gummy/database run migrate
pnpm --filter @gummy/database exec tsx src/seedPlans.ts

# 5. Run the bot
pnpm run dev:bot
```

## What success looks like

The bot process prints, in order:
```
[GuMMy] Checking database connectivity...
[GuMMy] Database check OK: Connected to Turso and executed a test query successfully.
[GuMMy] Logged in as YourBotName#0000
[GuMMy] Shard: 0 (single-shard mode)
[GuMMy] Guild count: 1
```

If instead it prints `Database check FAILED: ...` or `Fatal startup error:
Missing required environment variable(s): ...`, the process exits with a
non-zero code on purpose — it will never pretend to be connected. Fix the
specific thing the message names and re-run.

See `TROUBLESHOOTING.md` for common failure messages (created as the project
grows — currently covers only what Phase 1 can fail on; expand it as new
phases add new failure modes).
