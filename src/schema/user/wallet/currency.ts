import { pgTable, serial, integer, text } from "drizzle-orm/pg-core"

import { userWallet } from "@/schema/user/wallet"
import { currencyEnum } from "@/schema/enums"

export const userWalletCurrency = pgTable('user_wallet_currency', {
	id: serial('id').primaryKey(),
	walletId: integer('wallet_id').references(() => userWallet.id, { onDelete: "cascade" }).notNull(),

	currency: currencyEnum('currency').notNull(),

	walletAddress: text('wallet_address').notNull()
})