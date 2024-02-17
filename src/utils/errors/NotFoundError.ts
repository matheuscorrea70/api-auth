export class NotFoundError extends Error {
  status = 404;
  message = "Not found";

  constructor(message = "") {
    super();
    this.message = `${this.message}: ${message}`;
  }
}
