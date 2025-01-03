import express from 'express'

import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  getOneName,
  updateOne,
} from '../controllers/persons.js'

export const persons_api = express()

persons_api.get('/', async (req, res, next) => {
  const name = req.query.name
  if (name) {
    getOneName(name)
      .then((person) => res.status(200).json(person))
      .catch((error) => next(error))
  } else {
    getAll()
      .then((persons) => res.status(200).json(persons))
      .catch((error) => next(error))
  }
})

persons_api.get('/:id', async (req, res, next) => {
  const id = req.params.id
  getOne(id)
    .then((person) => res.status(200).json(person))
    .catch((error) => next(error))
})

persons_api.post('/', async (req, res, next) => {
  const { name, number } = req.body
  createOne(name, number)
    .then((person) => res.status(200).json(person))
    .catch((error) => next(error))
})

persons_api.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  deleteOne(id)
    .then((person) => res.status(200).json(person))
    .catch((error) => next(error))
})

persons_api.put('/:id', async (req, res, next) => {
  const id = req.params.id
  const { number } = req.body
  updateOne(id, number)
    .then((person) => res.status(200).json(person))
    .catch((error) => next(error))
})
