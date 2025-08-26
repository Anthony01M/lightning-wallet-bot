import { pgTable, decimal, serial, integer } from "drizzle-orm/pg-core"

import { currencyEnum } from "@/schema/enums"
import { user } from "@/schema/user"

export const userBalance = pgTable('user_balance', {
	id: serial('id').primaryKey(),
	
	userId: integer('user_id').references(() => user.id).notNull(),

	currency: currencyEnum('currency').notNull(),
	amount: decimal('amount', { precision: 20, scale: 8 }).default('0').notNull()
})