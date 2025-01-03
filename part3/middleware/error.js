export const errorHandler = (error, request, response) => {
  console.error(error)
  console.error(
    `Error: ${error.message || '<No error message>'}, status: ${
      error.status || '<undefined>'
    }`
  )

  if (error.name === 'ValidationError') {
    return response
      .status(error.status || 400)
      .json({ error: error.message || 'Error validating input' })
  }

  return response
    .status(error.status || 500)
    .json({ ...error, error: error.message || 'Internal server error' })
}
