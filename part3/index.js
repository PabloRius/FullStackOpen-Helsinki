import express from 'express'
import { api } from './routes/api.js'
import { errorHandler } from './middleware/middleware.js'
import { PORT } from './utils/config.js'

const app = express()
app.use(express.json())
app.use(express.static('dist'))

app.use('/api', api)

app.use(errorHandler)

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})
