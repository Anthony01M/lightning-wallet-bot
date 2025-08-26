import { pgTable, serial, integer, decimal, timestamp, text } from "drizzle-orm/pg-core"

import { guildStoreSubscription } from "@/schema/guild/store/subscription"
import { currencyEnum, statusEnum } from "@/schema/enums"
import { guild } from "@/schema/guild"

export const guildStoreInvoice = pgTable('guild_store_invoice', {
	id: serial('id').primaryKey(),

	guildId: integer('guild_id').references(() => guild.id).notNull(),
	subscriptionId: integer('subscription_id').references(() => guildStoreSubscription.id),
	productId: text('product_id').notNull(),

	amount: decimal('amount', { precision: 20, scale: 8 }).notNull(),
	currency: currencyEnum('currency').notNull(),
	status: statusEnum('status').notNull(),

	dueDate: timestamp('due_date').notNull(),
	paidAt: timestamp('paid_at'),
	createdAt: timestamp('created_at').defaultNow().notNull()
})