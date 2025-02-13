import mongoose from 'mongoose'
import { MONGODB_URI } from './utils/config.js'
import { error, info } from './utils/logger.js'

export const init_mongo = () => {
  mongoose.set('strictQuery', false)
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      info('Connected to MongoDB')
    })
    .catch((err) => {
      error(`Error connecting to MongoDB: ${err.message}`)
    })
}
