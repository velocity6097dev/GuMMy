/**
 * Centralised environment access.
 *
 * Nothing in this project should call `process.env.X` directly outside of
 * this file. Everything else imports `env` from here, so there is exactly
 * one place that knows which variables exist and whether they are required.
 */

import { config as loadDotenv } from "dotenv";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../../../");
const envFilePath = path.join(repoRoot, ".env");

loadDotenv({ path: envFilePath, quiet: true });

type RequiredKey =
  | "DISCORD_BOT_TOKEN"
  | "DISCORD_CLIENT_ID"
  | "TURSO_DATABASE_URL"
  | "TURSO_AUTH_TOKEN";

type OptionalKey =
  | "DISCORD_CLIENT_SECRET"
  | "DISCORD_OAUTH_REDIRECT_URI"
  | "NODE_ENV"
  | "LOG_LEVEL"
  | "BRAND_NAME";

const OPTIONAL_DEFAULTS: Record<OptionalKey, string> = {
  DISCORD_CLIENT_SECRET: "",
  DISCORD_OAUTH_REDIRECT_URI: "",
  NODE_ENV: "development",
  LOG_LEVEL: "info",
  BRAND_NAME: "GuMMy",
};

/**
 * Reads a required variable. Throws a clear, specific error instead of
 * letting the process fail later with a confusing stack trace, and never
 * logs the value itself.
 */
function required(key: RequiredKey): string {
  const value = process.env[key];
  if (!value || value.trim().length === 0) {
    throw new Error(
      `Missing required environment variable "${key}". ` +
        `Copy .env.example to .env and fill it in, or check docs/ENVIRONMENT_VARIABLES.md.`,
    );
  }
  return value;
}

function optional(key: OptionalKey): string {
  const value = process.env[key];
  return value && value.trim().length > 0 ? value : OPTIONAL_DEFAULTS[key];
}

/**
 * Call this once at process startup (bot, api, migrations) to fail fast
 * with a readable message if something required is missing, rather than
 * discovering it deep inside an unrelated feature.
 */
export function validateEnv(keys: RequiredKey[]): void {
  const missing = keys.filter((k) => !process.env[k] || process.env[k]!.trim() === "");
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(", ")}. ` +
        `See .env.example and docs/ENVIRONMENT_VARIABLES.md.`,
    );
  }
}

export const env = {
  discord: {
    get botToken() {
      return required("DISCORD_BOT_TOKEN");
    },
    get clientId() {
      return required("DISCORD_CLIENT_ID");
    },
    get clientSecret() {
      return optional("DISCORD_CLIENT_SECRET");
    },
    get oauthRedirectUri() {
      return optional("DISCORD_OAUTH_REDIRECT_URI");
    },
  },
  turso: {
    get databaseUrl() {
      return required("TURSO_DATABASE_URL");
    },
    get authToken() {
      return required("TURSO_AUTH_TOKEN");
    },
  },
  nodeEnv: optional("NODE_ENV"),
  logLevel: optional("LOG_LEVEL"),
  brandName: optional("BRAND_NAME"),
};
