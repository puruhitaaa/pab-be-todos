import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core"

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
})

export type InsertTodo = typeof todos.$inferInsert
export type SelectTodo = typeof todos.$inferSelect
