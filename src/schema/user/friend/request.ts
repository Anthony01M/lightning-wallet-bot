import { pgTable, timestamp, serial, integer, text } from "drizzle-orm/pg-core"

import { friendRequestStatusEnum } from "@/schema/enums"
import { user } from "@/schema/user"

export const userFriendRequest = pgTable('user_friend_request', {
	id: serial('id').primaryKey(),
	fromUserId: integer('from_user_id').references(() => user.id).notNull(),
	toUserId: integer('to_user_id').references(() => user.id).notNull(),
	status: friendRequestStatusEnum('status').default('pending').notNull(),
	message: text('message'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	respondedAt: timestamp('responded_at')
})