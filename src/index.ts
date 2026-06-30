import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { type Quote, quotes } from './quotes.js'

const app = new Hono()

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    uptime: process.uptime(),
    quotes: quotes.length,
    timestamp: new Date().toISOString(),
  })
})

app.get('/quotes/random', (c) => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)]
  return c.json(quote)
})

app.get('/quotes', (c) => {
  return c.json(quotes)
})

app.get('/quotes/:id', (c) => {
  const id = Number(c.req.param('id'))
  const quote: Quote | undefined = quotes.find((q) => q.id === id)
  if(!quote) {
    return c.json({ error: `Quote ${c.req.param('id')} not found` }, 404)
  }
  return c.json(quote)
})

const port = Number(process.env.PORT) || 6767
serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Quotes API listening on http://localhost:${info.port}`)
})
