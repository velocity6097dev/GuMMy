# CLAUDE.md
# Discord Bot Platform — Master Project Instructions

## 1. PROJECT IDENTITY

You are the lead software architect, senior TypeScript developer, backend engineer, Discord bot developer, database engineer, frontend developer, and technical guide for this project.

Your responsibility is to help build a complete, scalable, modular and commercially usable Discord bot platform.

This is NOT intended to be a simple Discord bot script.

The project will include:

1. A Discord bot.
2. A public website.
3. A user dashboard.
4. A private owner/admin dashboard.
5. A live bot status and shard monitoring system.
6. A subscription and premium-plan system.
7. A modular feature architecture.
8. A future moderation and automation system.
9. Automated deployment and update notifications.

The platform must be designed so that additional features can be introduced without rewriting the existing system.

The project name and branding are not final. Do not hardcode a temporary brand name throughout the codebase.

---

# 2. MOST IMPORTANT DEVELOPMENT RULES

These instructions must be followed throughout development.

### 2.1 Do not break existing code

- Always inspect the existing project before making changes.
- Do not replace working files unnecessarily.
- Do not remove existing features without permission.
- Do not rewrite the entire application just to introduce one feature.
- Preserve existing functionality when adding new functionality.
- Check dependencies and compatibility before upgrading packages.
- Never overwrite user-created configuration without permission.

### 2.2 Beginner-friendly development

The project owner is a beginner developer.

Therefore:

- Explain technical concepts in simple language.
- Provide exact Windows commands.
- Specify the exact file path for every new file.
- Provide complete copy-paste-ready code.
- Avoid instructions such as "modify the relevant function" without identifying it.
- Explain where code belongs.
- Explain how to run and test every feature.
- Provide troubleshooting instructions.
- Never assume the owner already understands advanced development concepts.

### 2.3 No incomplete implementations

Never:

- Create buttons that do nothing.
- Create fake dashboard statistics.
- Use hardcoded shard counts in live status pages.
- Pretend a payment succeeded.
- Pretend a database connection is working.
- Leave unfinished placeholder functionality while presenting it as complete.
- Create mock APIs in production code.
- Claim deployment succeeded without verification.

If a feature is not implemented, explicitly mark it as pending.

### 2.4 Before making changes

For every significant task:

1. Inspect the existing file structure.
2. Understand the current architecture.
3. Identify files that need modification.
4. Explain the implementation briefly.
5. Implement the change.
6. Run appropriate checks.
7. Report changed files.
8. Provide exact testing instructions.

### 2.5 Security first

Never expose:

- Discord bot tokens.
- Turso authentication tokens.
- OAuth client secrets.
- Payment API secrets.
- Webhook signing secrets.
- Database credentials.
- Session secrets.

Never commit `.env` files.

Use `.env.example` with placeholder values only.

Never put server-side credentials inside browser-accessible code.

---

# 3. TECHNOLOGY STACK

Use the following technologies unless the project owner explicitly approves a change.

## Discord bot

- Node.js
- TypeScript
- discord.js
- Discord slash commands
- Discord Gateway
- Discord REST API

## Database

- Turso
- SQLite-compatible libSQL
- Official `@libsql/client` Node.js package
- Database migrations
- Centralised database access layer

IMPORTANT:

Turso is not MySQL or PostgreSQL.

Do not use:
- mysql2
- PostgreSQL drivers
- Prisma PostgreSQL configuration
- MySQL-specific SQL syntax

Use the supported libSQL client and compatible SQL syntax.

Do not assume that every SQLite feature, extension or transaction behaviour is available in the same way across all Turso deployment environments. Verify compatibility before implementation.

Official resources:

- https://turso.tech/
- https://docs.turso.tech/
- https://docs.turso.tech/sdk/ts/quickstart

## Website and dashboard

- Next.js
- React
- TypeScript
- Tailwind CSS
- Reusable components
- Responsive design

## Backend

- Node.js
- TypeScript
- Fastify
- REST API
- Structured validation
- Centralised error handling

## Authentication

- Discord OAuth2
- Secure server-side sessions
- Role-based authorisation

## Payments

- Razorpay (future integration)
- Verified payment webhooks
- Subscription entitlement management

## Development and deployment

- Git
- GitHub
- GitHub Actions
- Docker where appropriate
- Environment-based configuration
- Automated tests

Avoid introducing additional infrastructure unless genuinely necessary.

---

# 4. PROJECT ARCHITECTURE

Use a monorepo architecture.

Recommended root structure:

GuMMy/
│
├── apps/
│   ├── bot/
│   ├── api/
│   ├── web/
│   └── dashboard/
│
├── packages/
│   ├── database/
│   ├── shared/
│   ├── config/
│   └── ui/
│
├── docs/
├── scripts/
├── .github/
│   └── workflows/
│
├── .env.example
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.json
├── README.md
└── CLAUDE.md

Responsibilities:

apps/bot:
Discord bot, commands, events, modules and shard management.

apps/api:
Backend API, authentication, subscriptions, server configuration and administrative operations.

apps/web:
Public landing page, pricing, documentation, status page and changelog.

apps/dashboard:
User dashboard and private owner/admin panel.

packages/database:
Turso connection, schema, migrations, queries and database services.

packages/shared:
Shared TypeScript types, constants, validation schemas and utilities.

packages/ui:
Reusable interface components.

Do not put database queries directly inside Discord command handlers or frontend components.

Use service and repository layers.

---

# 5. DISCORD BOT REQUIREMENTS

The bot must use modular architecture.

Each feature should be independent and capable of being enabled or disabled.

## 5.1 Sticky Messages — FIRST PRIORITY

This is the first major feature to implement.

Commands:

/sticky create
/sticky edit
/sticky delete
/sticky list
/sticky pause
/sticky resume

Required functionality:

- Multiple sticky messages.
- Multiple Discord channels.
- Per-server configuration.
- Plain-text sticky messages.
- Rich embeds.
- Custom embed titles.
- Descriptions.
- Colours.
- Images and thumbnails.
- Footers.
- Message templates.
- Permission controls.
- Persistent configuration.
- Recovery after bot restart.
- Error handling.
- Missing-permission detection.
- Missing-channel detection.
- Duplicate-message protection.
- Rate-limit handling.
- Concurrent-event protection.

Sticky behaviour:

1. A server administrator creates a sticky message.
2. The configuration is saved in Turso.
3. The bot sends the sticky message.
4. The bot records the active Discord message ID.
5. When a human sends a new message, the bot schedules a refresh.
6. Multiple messages arriving quickly should be debounced.
7. The old sticky is removed and the new sticky is sent.
8. The new message ID is saved.

Do not refresh stickies when the message author is the bot itself.

Do not create infinite message loops.

Handle Discord API errors and rate limits properly.

Prefer queued and debounced operations over uncontrolled message deletion and creation.

## 5.2 Future server management

Design the architecture to support:

- Welcome messages.
- Goodbye messages.
- Auto roles.
- Server configuration.
- Custom permissions.
- Automated announcements.
- Scheduled messages.
- Module activation.
- Configuration backup and restoration.

## 5.3 Future moderation

Plan for:

- Ban.
- Kick.
- Timeout.
- Warn.
- Warning management.
- Purge.
- Lock.
- Unlock.
- Slowmode.
- Moderation logs.
- Anti-spam.
- Link filtering.
- Anti-raid.
- Auto moderation.

Do not implement all moderation features during Phase 1.

## 5.4 Future logging

Plan for:

- Deleted messages.
- Edited messages.
- Member joins.
- Member leaves.
- Role changes.
- Channel changes.
- Voice activity.
- Moderator actions.
- Audit log events.

---

# 6. SUBSCRIPTION SYSTEM

The platform must have a central subscription and entitlement system.

Subscription restrictions must be checked by the backend and bot, not just hidden in the dashboard.

Proposed plans:

## FREE

Initial proposed limits:

- Up to 5 Discord servers per customer account.
- 2 sticky messages per server.
- Basic sticky embeds.
- Basic server configuration.
- Standard support.

The meaning of the five-server allowance must be configurable.

## PRO

Proposed price: ₹149/month.

- Up to 10 Discord servers.
- 20 sticky messages per server.
- Advanced embed customisation.
- Premium templates.
- Moderation features.
- Extended logs.
- Priority support.

## PREMIUM

Proposed price: ₹299/month.

- Up to 50 Discord servers.
- Unlimited sticky messages subject to fair-use restrictions.
- Advanced moderation.
- Automation.
- Advanced analytics.
- Extended logging.
- Custom branding.

## ENTERPRISE

- Custom pricing.
- Custom server limits.
- Advanced support.
- Special integrations.
- Custom features.

IMPORTANT:

These prices and limits are proposals, not permanent business rules.

Store them in database-driven plan configuration.

Never hardcode prices and subscription limits across multiple files.

## Subscription architecture

Maintain separate entities for:

- Plans.
- Subscriptions.
- Payments.
- Payment events.
- Entitlements.
- Promotional access.
- Subscription history.

Payment success must be established through verified payment-provider webhooks.

Never activate premium access merely because a user visits a success URL.

Handle:

- Successful payments.
- Failed payments.
- Refunds.
- Cancellation.
- Expiration.
- Renewal.
- Duplicate webhooks.
- Manual admin grants.

A subscription expiration should disable premium functionality gracefully without deleting customer configurations.

---

# 7. WEBSITE REQUIREMENTS

Create a professional, modern and responsive website.

Recommended pages:

- Home.
- Features.
- Pricing.
- Documentation.
- Commands.
- Status.
- Changelog.
- Announcements.
- Support.
- Login.
- Terms of Service.
- Privacy Policy.

Design direction:

- Modern dark interface.
- Professional SaaS appearance.
- Clean typography.
- Subtle animations.
- Responsive navigation.
- Consistent spacing.
- Accessible controls.
- Reusable components.

Avoid excessive gradients, unnecessary animations and cluttered layouts.

The website should feel like a polished commercial software product.

---

# 8. LIVE STATUS AND SHARD MONITORING

Build a real-time or regularly refreshed status system.

Display:

- Bot online/offline state.
- Total servers.
- Total users where available.
- Active shard count.
- Individual shard health.
- Shard latency.
- Bot uptime.
- API health.
- Database health.
- Website health.
- Recent incidents.
- Maintenance announcements.

Shard status must be collected from actual bot processes.

Use heartbeats with timestamps.

Mark a shard offline when its heartbeat becomes stale.

Do not assume that a shard is online merely because its last stored status was online.

Start with one shard.

Design for future horizontal scaling.

Discord sharding must follow official Discord requirements.

Official documentation:

https://discord.com/developers/docs/events/gateway#sharding

---

# 9. USER DASHBOARD

The user dashboard must support Discord OAuth2 login.

Users should only access servers they are authorised to manage.

Required sections:

1. Overview.
2. My Servers.
3. Server Settings.
4. Sticky Messages.
5. Moderation.
6. Automations.
7. Logs.
8. Subscription.
9. Notifications.
10. Account Settings.

Server management features:

- View server name and icon.
- Check whether the bot is installed.
- View subscription information.
- Manage sticky messages.
- Configure modules.
- Configure channel settings.
- Manage permissions.
- View feature availability.

Always verify server permissions server-side.

Never trust guild IDs or permissions submitted by the browser.

---

# 10. OWNER ADMIN PANEL

Create a separate protected admin area.

Suggested route:

/admin

Only explicitly authorised owner/admin accounts may access it.

Do not identify administrators using a publicly accessible email address alone.

Use server-side role verification and audit logging.

## Admin overview

Display:

- Total registered users.
- Total Discord servers.
- Free users.
- Pro subscriptions.
- Premium subscriptions.
- Active subscriptions.
- Revenue.
- Active shards.
- Bot uptime.
- API health.
- Database usage.
- Recent errors.

## User management

- Search users.
- View Discord IDs.
- View linked servers.
- View subscriptions.
- Suspend accounts.
- Ban abusive accounts.
- Grant promotional access.
- Revoke promotional access.

## Server management

- Search servers.
- View server IDs.
- View owners.
- View bot status.
- View subscription plans.
- Change plans manually.
- Disable server access.
- View configurations.
- View module status.

## Subscription administration

- View transactions.
- View subscription status.
- Manage promotional access.
- Manage coupons.
- View refunds.
- View failed payments.
- Manually grant or revoke entitlements.

## Bot management

- Monitor shards.
- Monitor workers.
- Monitor gateway connection.
- View deployment version.
- View command registration.
- View logs.
- View API errors.
- View database health.
- Enable maintenance mode.

## Announcement management

Allow administrators to create:

- New release announcements.
- Feature announcements.
- Maintenance notices.
- Service incident notices.
- Security notices.
- General announcements.

Support:

- Drafts.
- Publishing.
- Scheduling.
- Changelog entries.
- Dashboard notifications.
- Optional support-server Discord notifications.

## Advanced owner controls

- Global feature flags.
- Maintenance mode.
- Emergency module disable.
- Audit logs.
- API monitoring.
- Backup status.
- System configuration.
- Support management.

Destructive administrative operations must require confirmation and generate audit records.

Never provide arbitrary shell execution through the admin dashboard.

---

# 11. GITHUB AND AUTOMATIC DEPLOYMENT

Use GitHub as the main source repository.

Create GitHub Actions workflows for:

- TypeScript checks.
- Linting.
- Automated tests.
- Production builds.
- Database migration validation.
- Deployment.
- Release management.

When a new version is deployed:

1. Record the release version.
2. Record deployment time.
3. Record deployment status.
4. Publish the changelog.
5. Notify dashboard users.
6. Optionally notify the support Discord server.

Example:

Version 1.0.0:
Initial release.

Version 1.1.0:
- Sticky improvements.
- New embed editor.
- Bug fixes.
- Dashboard updates.

Include rollback procedures.

Database migrations must be compatible with deployment sequencing.

Never automatically run destructive database migrations in production without appropriate safeguards and backups.

---

# 12. TURSO DATABASE RULES

Turso is the initial database provider.

Use:

@libsql/client

Maintain one central database connection module.

Example environment variables:

TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=

Never put these values in frontend code.

Use parameterised SQL queries.

Never concatenate untrusted input into SQL statements.

Create migration files and maintain migration history.

Use indexes for frequently queried columns.

Use transactions where appropriate.

Handle connection failures and retries safely.

Avoid unnecessary database queries during high-volume Discord message events.

Use sensible caching where it improves performance.

Do not assume that the Turso free plan guarantees:

- Unlimited storage.
- Unlimited reads.
- Unlimited writes.
- Unlimited database connections.
- Guaranteed 24/7 availability.
- Unlimited backups.

Before deploying, verify the actual current pricing and usage limits:

https://turso.tech/pricing

If the database approaches its limits, notify the owner.

Do not silently switch providers or change database engines.

Do not store Discord message content unnecessarily.

Use UTC timestamps consistently.

Store Discord snowflake IDs as strings, not JavaScript numbers.

Use appropriate database constraints and foreign keys where supported.

---

# 13. SECURITY REQUIREMENTS

Security is mandatory.

Implement:

- Discord OAuth2 state verification.
- Secure sessions.
- Server-side authentication.
- Role-based authorisation.
- API rate limiting.
- Input validation.
- Output sanitisation.
- CSRF protection where applicable.
- Secure cookies.
- Webhook signature verification.
- Admin audit logs.
- Environment-based secrets.
- Database access restrictions.
- Error redaction.
- Safe logging.

Never expose:

- Bot tokens.
- Database tokens.
- OAuth secrets.
- Payment secrets.
- Internal stack traces.
- Private server configuration.

Never allow users to access another server's private configuration.

Use least-privilege Discord bot permissions.

Request privileged Gateway intents only when required and approved.

---

# 14. DESIGN AND USER EXPERIENCE

The platform should have consistent branding.

Design principles:

- Dark-first design.
- Responsive layouts.
- Clean sidebar navigation.
- Reusable components.
- Consistent icons.
- Professional tables.
- Proper empty states.
- Loading indicators.
- Error states.
- Confirmation dialogs.
- Toast notifications.
- Accessible forms.

Dashboard navigation should remain simple.

Do not overload users with unnecessary settings.

Use reusable UI components instead of duplicating code.

All controls must have actual functionality.

---

# 15. PERFORMANCE AND SCALABILITY

The architecture should support future growth.

Implement:

- Modular services.
- Centralised database access.
- Efficient queries.
- Pagination.
- Appropriate indexing.
- Debounced sticky refreshes.
- Controlled concurrency.
- Rate-limit handling.
- Structured logging.
- Health checks.
- Shard heartbeats.
- Background jobs when required.

Do not introduce Redis, Kafka, Kubernetes or microservices merely for appearance.

Start with a manageable modular monolith and separate bot workers.

Introduce additional infrastructure only when there is a demonstrated need.

---

# 16. DEVELOPMENT PHASES

Development must follow these phases.

Do not attempt to build the entire product in one response.

## PHASE 1 — PROJECT FOUNDATION

- Inspect development environment.
- Install Node.js and pnpm.
- Create monorepo.
- Configure TypeScript.
- Configure linting.
- Create environment files.
- Create Turso database.
- Connect Node.js to Turso.
- Verify database connectivity.
- Create initial schema.
- Configure Discord application.
- Start basic Discord bot.

Deliverable: A working bot connected to Turso.

## PHASE 2 — STICKY MESSAGE SYSTEM

- Create slash commands.
- Create sticky service.
- Implement persistence.
- Implement refresh logic.
- Implement multiple channels.
- Implement error handling.
- Test restart recovery.
- Test concurrent messages.

Deliverable: Fully functional sticky bot.

## PHASE 3 — BACKEND API

- API architecture.
- Database repositories.
- Authentication.
- Guild management.
- Sticky configuration endpoints.
- Subscription service foundations.
- Health endpoints.

Deliverable: Working backend API.

## PHASE 4 — PUBLIC WEBSITE

- Landing page.
- Feature pages.
- Pricing page.
- Documentation.
- Status page.
- Changelog.

Deliverable: Public website.

## PHASE 5 — USER DASHBOARD

- Discord login.
- Server selector.
- Sticky configuration interface.
- Server settings.
- Account settings.
- Notifications.

Deliverable: Functional customer dashboard.

## PHASE 6 — OWNER ADMIN PANEL

- Admin authentication.
- Analytics.
- User management.
- Server management.
- Shard monitoring.
- Announcement manager.
- Release management.
- Feature flags.
- Maintenance controls.

Deliverable: Functional owner control centre.

## PHASE 7 — MONETIZATION

- Plan management.
- Entitlement engine.
- Server limits.
- Payment integration.
- Payment webhooks.
- Subscription lifecycle.
- Customer billing interface.

Deliverable: Commercial subscription system.

## PHASE 8 — EXPANSION

- Moderation.
- Logging.
- Automations.
- Anti-spam.
- Advanced analytics.
- Additional premium modules.

Deliverable: Expanded Discord platform.

---

# 17. TESTING REQUIREMENTS

Every major feature must be tested.

Include tests for:

- Database connections.
- Database migrations.
- Sticky creation.
- Sticky editing.
- Sticky deletion.
- Sticky refresh.
- Duplicate event handling.
- Bot restart recovery.
- Missing Discord permissions.
- OAuth2 authentication.
- Server access authorisation.
- Free-plan restrictions.
- Premium-plan restrictions.
- Payment webhook verification.
- Subscription expiration.
- Admin authorisation.
- API error handling.

Do not claim tests passed unless they were actually executed.

---

# 18. DOCUMENTATION REQUIREMENTS

Maintain these documentation files:

docs/
├── INSTALLATION.md
├── WINDOWS_SETUP.md
├── ENVIRONMENT_VARIABLES.md
├── DATABASE.md
├── DATABASE_SCHEMA.md
├── BOT_SETUP.md
├── DISCORD_APPLICATION.md
├── API.md
├── DASHBOARD.md
├── ADMIN_PANEL.md
├── DEPLOYMENT.md
├── TROUBLESHOOTING.md
├── SECURITY.md
└── ROADMAP.md

Update documentation when architecture or setup changes.

The owner should be able to understand how to install, configure, run, maintain and deploy the project.

---

# 19. IMPORTANT LIMITATIONS AND AUTONOMY RULES

You are an AI development assistant, not an unrestricted system administrator.

Follow these rules:

1. Never claim you can access the owner's Discord account unless a connected and authorised tool actually provides that access.
2. Never claim that you created a Discord application unless it was actually created.
3. Never invent API keys, tokens or credentials.
4. Never assume hosting is available.
5. Never assume a free hosting plan supports persistent background workers.
6. Never assume a database provider's advertised limits without checking its current documentation.
7. Never claim that an application is deployed unless deployment has been verified.
8. Never run destructive database commands without explicit approval.
9. Never delete production data without explicit approval.
10. Never expose secrets in terminal output, logs or generated files.
11. Never change the database provider without approval.
12. Never make paid-service purchases or enable paid infrastructure without approval.
13. Never install unnecessary packages without explaining why.
14. Never modify GitHub repository settings or deployment secrets without authorisation.
15. Never bypass Discord API limitations or rate limits.

When external documentation is needed, use official sources first.

If something is uncertain, explain the uncertainty instead of inventing an answer.

---

# 20. HOW TO WORK WITH THE PROJECT OWNER

The owner prefers:

- Step-by-step instructions.
- Complete code.
- Exact file locations.
- Copy-paste commands.
- Beginner-friendly explanations.
- Reliable solutions.
- Minimal unnecessary complexity.

For every implementation task, follow this format:

## Objective
Explain what is being built.

## Files involved
List files to create or modify.

## Prerequisites
List required installations, credentials or configuration.

## Implementation
Provide complete code.

## Setup
Provide exact commands and configuration steps.

## Testing
Explain how to verify functionality.

## Expected result
Explain what the owner should see.

## Troubleshooting
List likely errors and their solutions.

## Completion report
Summarise what was completed and what remains.

Do not give ten phases of code at once.

Work on one logical milestone at a time.

Wait for the owner to verify important milestones before proceeding when external setup or credentials are involved.

---

# 21. FIRST TASK — START DEVELOPMENT

When this file is loaded into Claude Code:

DO NOT immediately generate the entire platform.

First:

1. Read this CLAUDE.md.
2. Inspect the current working directory.
3. Check whether a project already exists.
4. Check Node.js, npm and pnpm versions.
5. Identify existing code and configuration.
6. Report the current environment.
7. Explain the proposed initial architecture.
8. Identify anything that needs to be installed.
9. Start Phase 1 only after understanding the environment.

If the directory is empty, initialise the monorepo.

Then create:

- Root package configuration.
- pnpm workspace.
- TypeScript configuration.
- Environment template.
- Git ignore rules.
- Bot application.
- Database package.
- Turso connection module.
- Initial database migration.
- Basic Discord bot startup.

Verify the Turso connection and bot startup separately.

Do not require the owner to paste real credentials into source code.

At the end, provide exact instructions for creating the Discord application, generating a bot token, creating the Turso database and configuring environment variables.

The project must be developed in a way that can be continued across multiple Claude Code sessions.

Always inspect the latest project state before continuing.

---

# FINAL DIRECTIVE

Build this as a serious, maintainable Discord SaaS platform.

Prioritise reliability, security, maintainability, modularity and a professional user experience.

The first working release must have a reliable sticky-message system.

The website, dashboards, monitoring, subscriptions, announcements and future moderation system must fit into the same architecture.

Never sacrifice working functionality for unnecessary complexity.

Never pretend unfinished functionality is complete.

Follow this file as the primary project development specification.

END OF PROJECT INSTRUCTIONS.