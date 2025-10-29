import { Hono } from "hono"
import { db } from "./db.js"
import { todos } from "./schema.js"
import type { InsertTodo } from "./schema.js"
import { eq } from "drizzle-orm"

const app = new Hono()

// GET /todos - list all todos
app.get("/todos", async (c) => {
  const allTodos = await db.select().from(todos)
  return c.json(allTodos)
})

// POST /todos - create a new todo
app.post("/todos", async (c) => {
  const body: InsertTodo = await c.req.json()
  const result = await db.insert(todos).values(body).returning()
  return c.json(result[0])
})

// GET /todos/:id - get a specific todo
app.get("/todos/:id", async (c) => {
  const id = parseInt(c.req.param("id"))
  const todo = await db.select().from(todos).where(eq(todos.id, id))
  if (todo.length === 0) {
    return c.json({ error: "Todo not found" }, 404)
  }
  return c.json(todo[0])
})

// PUT /todos/:id - update a todo
app.put("/todos/:id", async (c) => {
  const id = parseInt(c.req.param("id"))
  const body: Partial<InsertTodo> = await c.req.json()
  const result = await db
    .update(todos)
    .set(body)
    .where(eq(todos.id, id))
    .returning()
  if (result.length === 0) {
    return c.json({ error: "Todo not found" }, 404)
  }
  return c.json(result[0])
})

// DELETE /todos/:id - delete a todo
app.delete("/todos/:id", async (c) => {
  const id = parseInt(c.req.param("id"))
  const result = await db.delete(todos).where(eq(todos.id, id)).returning()
  if (result.length === 0) {
    return c.json({ error: "Todo not found" }, 404)
  }
  return c.json({ message: "Deleted" })
})

export default app
