export class StatusError extends Error {
  constructor(status, message, name) {
    super(message);
    this.status = status ? status : 500;
  }
}
