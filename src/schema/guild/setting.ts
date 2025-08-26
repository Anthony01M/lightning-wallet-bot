import { pgTable, text, timestamp, serial, integer, boolean } from "drizzle-orm/pg-core"

import { guild } from "@/schema/guild"

export const guildSetting = pgTable('guild_setting', {
	id: serial('id').primaryKey(),
	
	guildId: integer('guild_id').references(() => guild.id).notNull(),

	storeEnabled: boolean('store_enabled').default(false).notNull(),
	thankYouEnabled: boolean('thank_you_enabled').default(true).notNull(),
	thankYouMessage: text('thank_you_message'),
	auditLogChannelId: text('audit_log_channel_id'),
	boosterRoleId: text('booster_role_id'),

	updatedAt: timestamp('updated_at').defaultNow().notNull()
})