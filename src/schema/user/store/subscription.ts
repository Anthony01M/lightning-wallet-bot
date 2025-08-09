import { pgTable, timestamp, decimal, text, serial, integer, boolean } from "drizzle-orm/pg-core"

import { currencyEnum, storeProductCategoryEnum, billingCycleEnum } from "@/schema/enums"
import { user } from "@/schema/user"

export const userStoreSubscription = pgTable('user_store_subscription', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').references(() => user.id, { onDelete: "cascade" }).notNull(),
	
	productId: text('product_id').notNull(),
	productCategory: storeProductCategoryEnum('product_category').notNull(),
	
	currency: currencyEnum('currency').notNull(),
	recurringPrice: decimal('recurring_price', { precision: 20, scale: 8 }).notNull(),
	billingCycle: billingCycleEnum('billing_cycle').notNull(),

	isAutoRenew: boolean('is_auto_renew').default(false).notNull(),
	isActive: boolean('is_active').default(true).notNull(),
	
	startedAt: timestamp('started_at').defaultNow().notNull(),
	nextBillingAt: timestamp('next_billing_at').notNull(),
	cancelledAt: timestamp('cancelled_at'),
	lastChargedAt: timestamp('last_charged_at')
})