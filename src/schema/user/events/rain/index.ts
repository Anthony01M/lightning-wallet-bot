import { pgTable, timestamp, integer, decimal, boolean, serial } from "drizzle-orm/pg-core"

import { currencyEnum } from "@/schema/enums"
import { user } from "@/schema/user"

export const rain = pgTable('rain', {
	id: serial('id').primaryKey(),

	createdByUserId: integer('created_by_user_id').references(() => user.id).notNull(),

	currency: currencyEnum('currency').notNull(),
	totalAmount: decimal('total_amount', { precision: 20, scale: 8 }).notNull(),

	maxParticipants: integer('max_participants').notNull(),
	currentParticipants: integer('current_participants').default(0).notNull(),

	isPerPersonAmount: boolean('is_per_person_amount').default(false).notNull(),
	isActive: boolean('is_active').default(true).notNull(),

	createdAt: timestamp('created_at').defaultNow().notNull(),
	completedAt: timestamp('completed_at')
})