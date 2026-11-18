# Creating the Discord Application (do this once)

Claude cannot create this for you — it requires your own Discord account.

1. Go to https://discord.com/developers/applications and log in.
2. Click **New Application**, give it a working name (this is not your final
   brand name — you can rename it later in the same page).
3. Open **Bot** in the left sidebar → **Reset Token** → copy the token
   immediately (Discord only shows it once). Put it in your local `.env` as
   `DISCORD_BOT_TOKEN`.
4. On the same **Bot** page, leave **Privileged Gateway Intents** (Presence,
   Server Members, Message Content) OFF for now. Phase 1 does not need them.
   Phase 2 (sticky messages) only needs the basic Guilds + Guild Messages
   intents, which are not privileged. We will revisit this explicitly before
   enabling anything privileged, per CLAUDE.md section 13.
5. Open **OAuth2 → General** and copy the **Client ID** into `.env` as
   `DISCORD_CLIENT_ID`. (Client Secret is not needed until Phase 5 — skip it.)
6. Open **OAuth2 → URL Generator**:
   - Scopes: `bot`, `applications.commands`
   - Bot Permissions (Phase 1/2 minimum): `Send Messages`, `Embed Links`,
     `Manage Messages`, `Read Message History`, `View Channel`
   - Copy the generated URL, open it in a browser, and invite the bot to a
     **test server you control**.

You now have everything `apps/bot` needs to log in.
