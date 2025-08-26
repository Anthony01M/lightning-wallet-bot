import { pgTable, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core"

import { actionTypeEnum } from "@/schema/enums"
import { guild } from "@/schema/guild"
import { user } from "@/schema/user"

export const guildAction = pgTable('guild_action', {
	id: serial('id').primaryKey(),

	guildId: integer('guild_id').references(() => guild.id),
	discordId: varchar('discord_id', { length: 32 }),
	adminId: integer('admin_id').references(() => user.id),

	type: actionTypeEnum('type').notNull(),
	reason: varchar('reason', { length: 255 }),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	expiresAt: timestamp('expires_at')
})