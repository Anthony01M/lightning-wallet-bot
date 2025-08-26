import { pgTable, serial, integer, decimal, timestamp } from "drizzle-orm/pg-core"

import { drop } from "@/schema/user/events/drop/air"
import { user } from "@/schema/user"

export const dropParticipant = pgTable('drop_participant', {
	id: serial('id').primaryKey(),

	dropId: integer('drop_id').references(() => drop.id).notNull(),
	userId: integer('user_id').references(() => user.id).notNull(),

	amountReceived: decimal('amount_received', { precision: 20, scale: 8 }).notNull(),

	participatedAt: timestamp('participated_at').defaultNow().notNull()
})