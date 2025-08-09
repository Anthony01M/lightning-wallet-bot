import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core"

import { user } from "@/schema/user"

export const userLevel = pgTable('user_level', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').references(() => user.id, { onDelete: "cascade" }).notNull().unique(),
	level: integer('level').default(1).notNull(),
	xp: integer('xp').default(0).notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull()
})