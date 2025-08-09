import { pgTable, timestamp, serial, varchar } from "drizzle-orm/pg-core"

export const guild = pgTable('guild', {
    id: serial('id').primaryKey(),
    discordId: varchar('discord_id', { length: 32 }).notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})