import { pgTable, serial, integer, text, boolean, varchar } from "drizzle-orm/pg-core"

import { guild } from "@/schema/guild"

export const guildSellableRole = pgTable('guild_sellable_role', {
	id: serial('id').primaryKey(),

	guildId: integer('guild_id').references(() => guild.id).notNull(),
	roleId: varchar('role_id', { length: 32 }).notNull(),

	description: text('description'),
	priceSatoshi: integer('price_satoshi'),
	priceUsd: integer('price_usd'),

	isSubscription: boolean('is_subscription').default(false).notNull(),
	subscriptionPeriod: text('subscription_period'),
	isActive: boolean('is_active').default(true).notNull()
})