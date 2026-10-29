import * as handlers           from './pages/index.js'
import Database                from './data/Database.js'
import dotenv                  from 'dotenv/config'
import express                 from 'express'
import handleUncaughtException from './app/errors.js'
import hbs                     from './app/handlebars.js'
import helmet                  from './middleware/helmet.js'
import issueLink               from './middleware/issue-link.js'
import locals                  from './app/locals.js'
import logger                  from './middleware/logger.js'
import markdownEngine          from './app/markdown.js'
import path                    from 'node:path'
import serveStatic             from './middleware/static.js'
import vary                    from './middleware/vary.js'

// Load environment variables
if (!process.env.NODE_ENV) dotenv.config()

// Handle uncaught errors
process.on(`uncaughtException`, handleUncaughtException)

// Initialize Express app
const app = express()
app.db = new Database
await app.db.initialize()
Object.assign(app.locals, locals)

// Settings
app.enable(`trust proxy`)
app.engine(`hbs`, hbs.engine)
app.engine(`md`, markdownEngine(app))
app.set(`env`, process.env.NODE_ENV)
app.set(`view engine`, `hbs`)
app.set(`views`, path.resolve(import.meta.dirname, `./pages`))

// Middleware
app.use(helmet)
app.use(vary)
app.use(serveStatic(express))
app.use(`/data/csv`, express.static(path.resolve(import.meta.dirname, `./data/csv`)))
app.use(logger)
app.use(issueLink)

// Routes
app.get(`/`, handlers.md(`About`))
if (process.env.NODE_ENV !== `production`) {
  app.get(`/500-test`, handlers.ServerErrorTest)
}
app.get(`/abbreviations`, handlers.md(`Abbreviations`))
app.get(`/bibliography`, handlers.md(`Bibliography`))
app.get(`/grammar`, handlers.md(`Grammar`))
app.get(`/research`, handlers.md(`Research`))
app.get(`/research/:pub`, handlers.Research)
app.get(`/search`, handlers.Search)
app.get(`/components`, handlers.Search)
app.get(`/components/:componentID`, handlers.Component)
app.use(handlers.PageNotFound)
app.use(handlers.ServerError)

// Start server
app.listen(process.env.PORT, () => {
  console.info(`\nServer started. Press Ctrl+C to terminate.
  ENV:  ${ process.env.NODE_ENV }
  NODE: ${ process.version }
  PORT: ${ process.env.PORT }\n`)
})
