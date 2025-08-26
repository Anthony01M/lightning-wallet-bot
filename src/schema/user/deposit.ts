import { pgTable, timestamp, decimal, text, serial, integer } from "drizzle-orm/pg-core"

import { currencyEnum, transactionStatusEnum } from "@/schema/enums"
import { user } from "@/schema/user"

export const userDeposit = pgTable('user_deposit', {
	id: serial('id').primaryKey(),

	userId: integer('user_id').references(() => user.id, { onDelete: "cascade" }).notNull(),

	currency: currencyEnum('currency').notNull(),
	amount: decimal('amount', { precision: 20, scale: 8 }).notNull(),

	status: transactionStatusEnum('status').default('pending').notNull(),

	lightningInvoice: text('lightning_invoice').notNull(),
	externalTransactionId: text('external_transaction_id'),

	expiresAt: timestamp('expires_at').notNull(),
	requestedAt: timestamp('requested_at').defaultNow().notNull(),
	completedAt: timestamp('completed_at')
})