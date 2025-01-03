export class StatusError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status ? status : 500
  }
}
