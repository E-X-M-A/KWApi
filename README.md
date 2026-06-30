# KWApi

A simple HTTP API serving Karsten Weihe quotes, built with [Hono](https://hono.dev/) and TypeScript.

## Requirements

- Node.js 18+
- npm

## Setup

```bash
npm install
```

## Running

**Development** (auto-reloads on file changes, no build step):

```bash
npm run dev
```

**Production** (compile to `dist/`, then run the compiled JS):

```bash
npm run build
npm start
```

The server listens on **http://localhost:6767** by default. Override the port with the `PORT` environment variable:

```bash
PORT=8080 npm run dev
```

## Endpoints

Base URL: `http://localhost:6767`

| Method | Path             | Description                          |
| ------ | ---------------- | ------------------------------------ |
| `GET`  | `/health`        | Liveness/status probe for monitoring |
| `GET`  | `/quotes`        | List all quotes                      |
| `GET`  | `/quotes/random` | A single random quote                |
| `GET`  | `/quotes/:id`    | A single quote by its `id`           |

### `GET /health`

Returns service status, process uptime, and the number of quotes loaded. Useful for status pages and uptime monitors.

```bash
curl http://localhost:6767/health
```

```json
{
  "status": "ok",
  "uptime": 12.34,
  "quotes": 55,
  "timestamp": "2026-06-30T10:00:00.000Z"
}
```

### `GET /quotes`

Returns the full list of quotes as an array.

```bash
curl http://localhost:6767/quotes
```

```json
[
  {
    "id": 1,
    "text": "Das muss ich, glaube ich korrigieren. [...]",
    "context": "nach sieben Jahren FOP",
    "author": "Karsten Weihe"
  },
  ...
]
```

### `GET /quotes/random`

Returns one randomly selected quote.

```bash
curl http://localhost:6767/quotes/random
```

```json
{
  "id": 34,
  "text": "Nech",
  "author": "Karsten Weihe"
}
```

### `GET /quotes/:id`

Returns the quote with the given `id`. IDs are 1-based.

```bash
curl http://localhost:6767/quotes/3
```

```json
{
  "id": 3,
  "text": "Und implementieren heißt jedenfalls implementieren",
  "author": "Karsten Weihe"
}
```

If no quote matches the `id`, responds with **404**:

```json
{
  "error": "Quote 999 not found"
}
```

## Quote model

```ts
type Quote = {
  id: number        // unique, 1-based
  text: string      // the quote itself
  context?: string  // optional note about when/why it was said
  author: string    // always "Karsten Weihe"
}
```

Quotes live in [src/quotes.ts](src/quotes.ts).
