/**
 * Discord snowflake IDs must always be strings (they exceed safe JS integer
 * range) - see CLAUDE.md section 12.
 */
export type Snowflake = string;

export type StickyStatus = "active" | "paused";

/**
 * Row shape for the `stickies` table (packages/database).
 * This is the Phase 2 feature, defined now so the schema and future bot
 * code agree on field names from the start.
 */
export interface StickyMessage {
  id: string;
  guildId: Snowflake;
  channelId: Snowflake;
  /** The currently-live Discord message ID, if one is posted right now. */
  currentMessageId: Snowflake | null;
  status: StickyStatus;
  contentType: "plain" | "embed";
  plainContent: string | null;
  embedTitle: string | null;
  embedDescription: string | null;
  embedColor: string | null;
  embedImageUrl: string | null;
  embedThumbnailUrl: string | null;
  embedFooter: string | null;
  createdAt: string; // ISO 8601 UTC
  updatedAt: string; // ISO 8601 UTC
}

export interface PlanRow {
  key: string;
  name: string;
  priceInrPerMonth: number | null;
  maxServers: number | null;
  maxStickiesPerServer: number | null;
}
