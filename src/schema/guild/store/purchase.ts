import { pgTable, timestamp, decimal, text, serial, integer, boolean } from "drizzle-orm/pg-core"

import { currencyEnum, storeProductCategoryEnum } from "@/schema/enums"
import { guild } from "@/schema/guild"

export const guildStorePurchase = pgTable('guild_store_purchase', {
    id: serial('id').primaryKey(),
    guildId: integer('guild_id').references(() => guild.id).notNull(),
    
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