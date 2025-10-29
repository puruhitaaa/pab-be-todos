import { Hono } from "hono"
import todos from "./routes/todos.js"

const app = new Hono()

app.route("/todos", todos)

export default app
