import { pgTable, timestamp, decimal, text, serial, integer } from "drizzle-orm/pg-core"

import { currencyEnum, transactionStatusEnum } from "@/schema/enums"
import { userWallet } from "@/schema/user/wallet"
import { user } from "@/schema/user"

export const userWithdraw = pgTable('user_withdraw', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').references(() => user.id, { onDelete: "cascade" }).notNull(),
	walletId: integer('wallet_id').references(() => userWallet.id).notNull(),

	currency: currencyEnum('currency').notNull(),
	amount: decimal('amount', { precision: 20, scale: 8 }).notNull(),
	fee: decimal('fee', { precision: 20, scale: 8 }).default('0'),

	status: transactionStatusEnum('status').default('pending').notNull(),

	externalTransactionId: text('external_transaction_id'),

	requestedAt: timestamp('requested_at').defaultNow().notNull(),
	completedAt: timestamp('completed_at')
})