# Troubleshooting

This file currently only covers Phase 1 (foundation + bot login + DB
connectivity). It will grow as later phases are implemented.

## "Missing required environment variable(s): ..."
One or more of `DISCORD_BOT_TOKEN`, `DISCORD_CLIENT_ID`,
`TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN` is missing from `.env`. Copy
`.env.example` to `.env` if you haven't, and check `ENVIRONMENT_VARIABLES.md`.

## "Database check FAILED: ..."
The bot starts but can't query Turso. Common causes:
- `TURSO_DATABASE_URL` or `TURSO_AUTH_TOKEN` is wrong or expired — regenerate
  via `turso db tokens create <name>`.
- The database name in the URL doesn't match a database you actually created.
- You haven't run migrations yet (`pnpm --filter @gummy/database run migrate`)
  — note this specific check only runs `SELECT 1`, so this is unlikely to be
  the cause of *this* error, but migrations are still required before the
  bot does anything useful.

## Discord login fails / "An invalid token was provided"
- You copied the **Client ID** into `DISCORD_BOT_TOKEN` by mistake, or
  vice versa. They are different values on different pages.
- The token was reset in the Developer Portal after you copied it (tokens
  can only be viewed once — reset generates a new one).

## `pnpm install` fails with a build-script / approval error
Some native dependencies (e.g. `esbuild`) need their install scripts
explicitly approved by pnpm. Run `pnpm approve-builds --all` once per
machine, then re-run `pnpm install`.

## TypeScript build fails with "Referenced project ... may not disable emit"
Don't add `--noEmit` to a `tsc -b` command in a package that other workspace
packages reference — composite project references need the `.d.ts` output.
Use plain `tsc -b` for both `build` and `typecheck` scripts in this repo.
