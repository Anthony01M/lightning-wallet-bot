import { pgTable, timestamp, serial, integer } from "drizzle-orm/pg-core"

import { user } from "@/schema/user"

export const userFriend = pgTable('user_friend', {
	id: serial('id').primaryKey(),

	userId: integer('user_id').references(() => user.id).notNull(),
	friendId: integer('friend_id').references(() => user.id).notNull(),

	createdAt: timestamp('created_at').defaultNow().notNull()
})