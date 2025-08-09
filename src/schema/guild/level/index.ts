import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core"

import { guild } from "@/schema/guild"

export const guildLevel = pgTable('guild_level', {
	id: serial('id').primaryKey(),
	guildId: integer('guild_id').references(() => guild.id, { onDelete: "cascade" }).notNull(),
	level: integer('level').default(1).notNull(),
	xp: integer('xp').default(0).notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
})