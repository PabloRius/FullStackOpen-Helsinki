import mongoose from 'mongoose'
import { MONGODB_URI } from '../utils/config'

mongoose.set('strictQuery', false)
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.error(`Error connecting to MongoDB: ${err.message}`)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, minLength: 3, required: true },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = document._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})
const Person = mongoose.model('Person', personSchema, 'phonebook')

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose connection disconnected due to app termination')
    process.exit(0)
  })
})

export default Person
