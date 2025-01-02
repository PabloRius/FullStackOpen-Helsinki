export const errorHandler = (error, request, response, next) => {
  console.error(
    `Error: ${error.message || "<No error message>"}, status: ${
      error.status || "<undefined>"
    }`
  );

  return response
    .status(error.status || 500)
    .json({ error: error.message || "Internal server error" });
};
