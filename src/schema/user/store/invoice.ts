import { pgTable, serial, integer, decimal, timestamp, text } from "drizzle-orm/pg-core"

import { userStoreSubscription } from "@/schema/user/store/subscription"
import { currencyEnum, statusEnum } from "@/schema/enums"
import { user } from "@/schema/user"

export const userStoreInvoice = pgTable('user_store_invoice', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => user.id, { onDelete: "cascade" }).notNull(),
    subscriptionId: integer('subscription_id').references(() => userStoreSubscription.id, { onDelete: "cascade" }),
    productId: text('product_id').notNull(),
    amount: decimal('amount', { precision: 20, scale: 8 }).notNull(),
    currency: currencyEnum('currency').notNull(),
    status: statusEnum('status').notNull(),
    dueDate: timestamp('due_date').notNull(),
    paidAt: timestamp('paid_at'),
    createdAt: timestamp('created_at').defaultNow().notNull()
})