import { pgTable, timestamp, decimal, text, serial, integer } from "drizzle-orm/pg-core"

import { currencyEnum, transactionStatusEnum } from "@/schema/enums"
import { guild } from "@/schema/guild"
import { user } from "@/schema/user"

export const guildDeposit = pgTable('guild_deposit', {
	id: serial('id').primaryKey(),

	guildId: integer('guild_id').references(() => guild.id, { onDelete: "cascade" }).notNull(),
	fromUserId: integer('from_user_id').references(() => user.id).notNull(),

	currency: currencyEnum('currency').notNull(),
	amount: decimal('amount', { precision: 20, scale: 8 }).notNull(),

	status: transactionStatusEnum('status').default('pending').notNull(),

	lightningInvoice: text('lightning_invoice'),
	externalTransactionId: text('external_transaction_id'),

	expiresAt: timestamp('expires_at'),
	requestedAt: timestamp('requested_at').defaultNow().notNull(),
	completedAt: timestamp('completed_at')
})