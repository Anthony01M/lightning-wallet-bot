import { pgTable, decimal, serial, integer } from "drizzle-orm/pg-core"

import { currencyEnum } from "@/schema/enums"
import { guild } from "@/schema/guild"

export const guildBalance = pgTable('guild_balance', {
	id: serial('id').primaryKey(),
	guildId: integer('guild_id').references(() => guild.id).notNull(),

	currency: currencyEnum('currency').notNull(),
	amount: decimal('amount', { precision: 20, scale: 8 }).default('0').notNull()
})