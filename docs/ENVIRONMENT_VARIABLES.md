# Environment Variables

Copy `.env.example` to `.env` at the repo root and fill in real values.
**Never commit `.env`.** It's already in `.gitignore`.

| Variable | Required in Phase 1 | Where it's used | Notes |
|---|---|---|---|
| `DISCORD_BOT_TOKEN` | Yes | `apps/bot` | From the Discord Developer Portal → Bot → Reset Token. Treat like a password. |
| `DISCORD_CLIENT_ID` | Yes | `apps/bot`, OAuth later | The Application ID shown on the General Information page. |
| `DISCORD_CLIENT_SECRET` | No (needed from Phase 5, dashboard login) | `apps/api` (future) | Only needed once OAuth2 login exists. |
| `DISCORD_OAUTH_REDIRECT_URI` | No (Phase 5) | `apps/api` (future) | e.g. `https://yourdomain.com/auth/callback`. |
| `TURSO_DATABASE_URL` | Yes | `packages/database` | From `turso db show <name> --url` or the Turso dashboard. |
| `TURSO_AUTH_TOKEN` | Yes | `packages/database` | From `turso db tokens create <name>`. |
| `NODE_ENV` | No | everywhere | `development` or `production`. |
| `LOG_LEVEL` | No | everywhere | `info` by default. |
| `BRAND_NAME` | No | everywhere | Kept here (not hardcoded in source) because the final brand name isn't decided yet. |

Rule: **nothing outside `packages/config/src/env.ts` reads `process.env` directly.** If a new variable is needed, add it there first.
