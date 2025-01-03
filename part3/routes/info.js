import express from 'express'
import { getAll } from '../services/persons.js'

export const info_api = express()

info_api.get('/', async (req, res) => {
  const date = new Date()
  const persons = await getAll()
  if (!persons) {
    return res
      .status(500)
      .send('<p>Error retrieving the data form the server</p>')
  }
  return res
    .status(200)
    .send(
      `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
    )
})
