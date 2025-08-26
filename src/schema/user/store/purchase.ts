import { pgTable, timestamp, decimal, text, serial, integer, boolean } from "drizzle-orm/pg-core"

import { currencyEnum, storeProductCategoryEnum } from "@/schema/enums"
import { user } from "@/schema/user"

export const userStorePurchase = pgTable('user_store_purchase', {
	id: serial('id').primaryKey(),

	userId: integer('user_id').references(() => user.id, { onDelete: "cascade" }).notNull(),
	productId: text('product_id').notNull(),

	productCategory: storeProductCategoryEnum('product_category').notNull(),

	tier: integer('tier'),
	currency: currencyEnum('currency').notNull(),
	pricePaid: decimal('price_paid', { precision: 20, scale: 8 }).notNull(),

	isActive: boolean('is_active').default(true).notNull(),

	purchasedAt: timestamp('purchased_at').defaultNow().notNull(),
	expiresAt: timestamp('expires_at'),
	lastRenewedAt: timestamp('last_renewed_at')
})