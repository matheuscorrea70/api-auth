export class UnauthorizedError extends Error {
  status = 401;
  message = "Unauthorized";

  constructor(message = "") {
    super();
    this.message = `${this.message}: ${message}`;
  }
}
