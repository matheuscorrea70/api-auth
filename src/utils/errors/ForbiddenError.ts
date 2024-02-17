export class ForbiddenError extends Error {
  status = 403;
  message = "Forbidden";

  constructor(message = "") {
    super();
    this.message = `${this.message}: ${message}`;
  }
}
