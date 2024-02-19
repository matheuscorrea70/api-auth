export class InternalServerError extends Error {
  status = 500;
  message = "Internal Server Error";

  constructor(message = "") {
    super();
    this.message = `${this.message}: ${message}`;
  }
}
