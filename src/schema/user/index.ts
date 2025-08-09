import { pgTable, timestamp, serial, varchar } from "drizzle-orm/pg-core"

export const user = pgTable('user', {
    id: serial('id').primaryKey(),
    discordId: varchar('discord_id', { length: 32 }).notNull().unique(),
    registeredAt: timestamp('registered_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
})