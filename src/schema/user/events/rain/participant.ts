import { pgTable, timestamp, integer, decimal, serial } from "drizzle-orm/pg-core"

import { rain } from "@/schema/user/events/rain"
import { user } from "@/schema/user"

export const rainParticipant = pgTable('rain_participant', {
	id: serial('id').primaryKey(),

	rainId: integer('rain_id').references(() => rain.id).notNull(),
	userId: integer('user_id').references(() => user.id).notNull(),

	amountReceived: decimal('amount_received', { precision: 20, scale: 8 }).notNull(),

	participatedAt: timestamp('participated_at').defaultNow().notNull()
})