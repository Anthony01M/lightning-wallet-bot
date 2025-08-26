import { pgTable, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core"

import { actionTypeEnum } from "@/schema/enums"
import { user } from "@/schema/user"

export const userAction = pgTable('user_action', {
	id: serial('id').primaryKey(),

	adminId: integer('admin_id').references(() => user.id),
	userId: integer('user_id').references(() => user.id),
	discordId: varchar('discord_id', { length: 32 }),

	type: actionTypeEnum('type').notNull(),
	reason: varchar('reason', { length: 255 }),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	expiresAt: timestamp('expires_at')
})