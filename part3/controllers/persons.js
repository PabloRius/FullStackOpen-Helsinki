import Person from '../models/person.js'
import { StatusError } from '../custom/StatusError.js'

const getAll = async () => {
  const data = await Person.find({})
  return data
}

const getOne = async (id) => {
  const person = await Person.findById(id)

  if (!person) throw new StatusError(404, `Id ${id} doesn't exist`)

  return person
}

export const getOneName = async (name) => {
  const person = await Person.findOne({ name })

  if (!person) throw new StatusError(404, `Name ${name} doesn't exist`)

  return person
}

const deleteOne = async (id) => {
  const person = await Person.findByIdAndDelete(id)
  if (!person) throw new StatusError(404, `Id ${id} doesn't exist`)

  return person
}

const createOne = async (name, number) => {
  if (!name) throw new StatusError(400, 'Name is required')
  if (!number) throw new StatusError(400, 'Number is required')

  const existingPerson = await Person.findOne({ name })
  if (existingPerson) {
    const conflictingError = new StatusError(409, `${name} is already in use.`)
    conflictingError.id = existingPerson._id
    throw conflictingError
  }

  const newPerson = new Person({ name, number })
  await newPerson.save()
  return newPerson
}

const updateOne = async (id, number) => {
  if (!id) throw new StatusError(400, 'ID is required')
  if (!number) throw new StatusError(400, 'Number is required')

  const existing_person = await getOne(id)
  if (!existing_person) {
    throw new StatusError(404, `${id} not found.`)
  }
  const updatedPerson = await Person.findByIdAndUpdate(
    id,
    { number },
    { runValidators: true }
  )

  return updatedPerson
}

export { getAll, getOne, createOne, deleteOne, updateOne }
