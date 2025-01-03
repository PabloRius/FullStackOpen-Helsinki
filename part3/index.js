import express from 'express'
import { api } from './routes/api.js'
import { errorHandler } from './utils/middleware.js'
import { PORT } from './utils/config.js'
import { info } from './utils/logger.js'
import { init_mongo } from './app.js'

const app = express()
app.use(express.json())
app.use(express.static('dist'))

init_mongo()

app.use('/api', api)

app.use(errorHandler)

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})
