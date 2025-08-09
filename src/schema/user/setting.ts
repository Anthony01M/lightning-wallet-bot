import { pgTable, timestamp, serial, integer, boolean, text } from "drizzle-orm/pg-core"

import { user } from "@/schema/user"

export const userSetting = pgTable('user_setting', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').references(() => user.id, { onDelete: "cascade" }).notNull(),

	public: boolean('public').default(true).notNull(),
	allowFriendRequests: boolean('allow_friend_requests').default(true).notNull(),
	allowFriendRequestDms: boolean('allow_friend_request_dms').default(true).notNull(),
	customBlockMessage: text('custom_block_message'),

	updatedAt: timestamp('updated_at').defaultNow().notNull()
})