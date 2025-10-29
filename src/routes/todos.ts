import { Hono } from "hono"
import { db } from "../db.js"
import { todos } from "../schema.js"
import type { InsertTodo } from "../schema.js"
import { eq, ilike, or, asc, desc, sql } from "drizzle-orm"

const app = new Hono()

// GET /todos - list todos with pagination, filtering, sorting
app.get("/", async (c) => {
  const page = parseInt(c.req.query("page") || "1")
  const limit = parseInt(c.req.query("limit") || "10")
  const sort = c.req.query("sort") || "id"
  const order = c.req.query("order") || "asc"
  const filter = c.req.query("filter") || ""

  // Build where clause for filtering
  let whereClause = undefined
  if (filter) {
    whereClause = or(
      ilike(todos.title, `%${filter}%`),
      ilike(todos.description, `%${filter}%`)
    )
  }

  // Build order by
  let orderBy
  switch (sort) {
    case "title":
      orderBy = order === "desc" ? desc(todos.title) : asc(todos.title)
      break
    case "description":
      orderBy =
        order === "desc" ? desc(todos.description) : asc(todos.description)
      break
    case "completed":
      orderBy = order === "desc" ? desc(todos.completed) : asc(todos.completed)
      break
    case "createdAt":
      orderBy = order === "desc" ? desc(todos.createdAt) : asc(todos.createdAt)
      break
    default:
      orderBy = order === "desc" ? desc(todos.id) : asc(todos.id)
  }

  // Get total count
  const totalResult = await db
    .select({ count: sql<number>`cast(count(${todos.id}) as integer)` })
    .from(todos)
    .where(whereClause)

  const total = totalResult[0]?.count || 0

  // Get paginated data
  const data = await db
    .select()
    .from(todos)
    .where(whereClause)
    .orderBy(orderBy)
    .limit(limit)
    .offset((page - 1) * limit)

  return c.json({
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  })
})

// POST /todos - create a new todo
app.post("/", async (c) => {
  const body: InsertTodo = await c.req.json()
  const result = await db.insert(todos).values(body).returning()
  return c.json(result[0])
})

// GET /todos/:id - get a specific todo
app.get("/:id", async (c) => {
  const id = parseInt(c.req.param("id"))
  const todo = await db.select().from(todos).where(eq(todos.id, id))
  if (todo.length === 0) {
    return c.json({ error: "Todo not found" }, 404)
  }
  return c.json(todo[0])
})

// PUT /todos/:id - update a todo
app.put("/:id", async (c) => {
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
app.delete("/:id", async (c) => {
  const id = parseInt(c.req.param("id"))
  const result = await db.delete(todos).where(eq(todos.id, id)).returning()
  if (result.length === 0) {
    return c.json({ error: "Todo not found" }, 404)
  }
  return c.json({ message: "Deleted" })
})

export default app
