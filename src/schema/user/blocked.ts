import { pgTable, timestamp, serial, integer, varchar } from "drizzle-orm/pg-core"

import { user } from "@/schema/user"

export const userBlock = pgTable('user_block', {
	id: serial('id').primaryKey(),

	blockerId: integer('blocker_id').references(() => user.id, { onDelete: "cascade" }).notNull(),
	blockedId: integer('blocked_id').references(() => user.id).notNull(),
	blockedDiscordId: varchar('blocked_discord_id', { length: 32 }),

	createdAt: timestamp('created_at').defaultNow().notNull()
})