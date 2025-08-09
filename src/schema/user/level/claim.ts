import { pgTable, serial, integer, timestamp, unique } from "drizzle-orm/pg-core"

import { user } from "@/schema/user"

export const userLevelClaim = pgTable('user_level_claim', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').references(() => user.id, { onDelete: "cascade" }).notNull(),
	level: integer('level').notNull(),
	claimedAt: timestamp('claimed_at').defaultNow().notNull()
}, (table) => [
	unique().on(table.userId, table.level)
])