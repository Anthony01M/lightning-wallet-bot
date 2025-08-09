import { pgTable, timestamp, integer, decimal, boolean, serial, jsonb } from "drizzle-orm/pg-core"
import { currencyEnum } from "@/schema/enums"
import { user } from "@/schema/user"

export const minedrop = pgTable('minedrop', {
	id: serial('id').primaryKey(),
	createdByUserId: integer('created_by_user_id').references(() => user.id).notNull(),
	currency: currencyEnum('currency').notNull(),
	amount: decimal('amount', { precision: 20, scale: 8 }).notNull(),
	isActive: boolean('is_active').default(true).notNull(),
	expiresAt: timestamp('expires_at'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	completedAt: timestamp('completed_at')
})