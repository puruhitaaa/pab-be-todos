# Pab Be Todos API

A simple, no-authentication todolist API built with Hono web framework, Drizzle ORM, and Neon Postgres. Designed for quick prototyping and integration with frontend applications.

## Tech Stack

- **Framework**: Hono (lightweight, fast web framework for any JavaScript runtime)
- **ORM**: Drizzle ORM (type-safe SQL queries)
- **Database**: Neon Postgres (serverless PostgreSQL)
- **Language**: TypeScript
- **Deployment**: Vercel (serverless functions)

## Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn
- Vercel CLI (`npm install -g vercel` or `pnpm add -g vercel`)

## Getting Started

### 1. Installation

```bash
pnpm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_neon_database_connection_string
```

Get your Neon database URL from the [Neon Console](https://console.neon.tech).

### 3. Database Setup

Push the schema to your Neon database:

```bash
npx drizzle-kit push
```

### 4. Running Locally

Start the development server:

```bash
vc dev
```

The API will be available at `http://localhost:3000`.

## API Documentation

Base URL: `http://localhost:3000` (local) or your deployed Vercel URL.

All endpoints return JSON responses.

### List Todos

**GET** `/todos`

Retrieve a paginated, filtered, and sorted list of todos.

**Query Parameters:**

- `page` (number, optional): Page number (default: 1)
- `limit` (number, optional): Items per page (default: 10, max: 100)
- `sort` (string, optional): Sort field - `id`, `title`, `description`, `completed`, `createdAt` (default: `id`)
- `order` (string, optional): Sort order - `asc` or `desc` (default: `asc`)
- `filter` (string, optional): Search filter for title and description (case-insensitive)

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Buy groceries",
      "description": "Milk, bread, eggs",
      "completed": false,
      "createdAt": "2025-10-30T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

**Example:**

```
GET /todos?page=1&limit=5&sort=title&order=asc&filter=work
```

### Create Todo

**POST** `/todos`

Create a new todo item.

**Request Body:**

```json
{
  "title": "New Todo",
  "description": "Optional description",
  "completed": false
}
```

**Response:**

```json
{
  "id": 2,
  "title": "New Todo",
  "description": "Optional description",
  "completed": false,
  "createdAt": "2025-10-30T10:05:00.000Z"
}
```

### Get Todo

**GET** `/todos/:id`

Retrieve a specific todo by ID.

**Response:**

```json
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Milk, bread, eggs",
  "completed": false,
  "createdAt": "2025-10-30T10:00:00.000Z"
}
```

**Error Response (404):**

```json
{
  "error": "Todo not found"
}
```

### Update Todo

**PUT** `/todos/:id`

Update an existing todo.

**Request Body:** (partial update supported)

```json
{
  "title": "Updated title",
  "completed": true
}
```

**Response:** Same as create response.

### Delete Todo

**DELETE** `/todos/:id`

Delete a todo by ID.

**Response:**

```json
{
  "message": "Deleted"
}
```

**Error Response (404):**

```json
{
  "error": "Todo not found"
}
```

## Building for Production

```bash
vc build
```

## Deployment

Deploy to Vercel:

```bash
vc deploy
```

For production deployment, ensure your `DATABASE_URL` is set in Vercel's environment variables.

## Project Structure

```
src/
├── db.ts          # Database connection
├── schema.ts      # Drizzle schema definitions
├── index.ts       # Main app entry point
└── routes/
    └── todos.ts   # Todo API routes
```

## Development Notes

- The API has no authentication - suitable for prototyping or internal tools
- All timestamps are in ISO 8601 format
- Database schema is automatically managed via Drizzle migrations
- CORS is handled by Hono's default settings

For more information about Hono: https://hono.dev
For Drizzle ORM docs: https://orm.drizzle.team
