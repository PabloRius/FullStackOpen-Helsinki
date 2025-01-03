import { error } from './logger'

export const errorHandler = (err, request, response) => {
  error(
    `Error: ${err.message || '<No error message>'}, status: ${
      err.status || '<undefined>'
    }`
  )

  if (err.name === 'ValidationError') {
    return response
      .status(err.status || 400)
      .json({ error: err.message || 'Error validating input' })
  }

  return response
    .status(err.status || 500)
    .json({ ...err, error: err.message || 'Internal server error' })
}
