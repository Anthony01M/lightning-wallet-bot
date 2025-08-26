import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core"

import { guild } from "@/schema/guild"

export const guildLevelClaim = pgTable('guild_level_claim', {
	id: serial('id').primaryKey(),

	guildId: integer('guild_id').references(() => guild.id, { onDelete: "cascade" }).notNull(),

	level: integer('level').notNull(),

	claimedAt: timestamp('claimed_at').defaultNow().notNull()
})