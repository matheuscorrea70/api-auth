import { type Response } from "express";

import { CustomError } from "./CustomErro";

export const handleError = (
  error: CustomError | Error | unknown,
  response: Response
): void => {
  if (error instanceof CustomError) {
    response.status(error.status).send(error);
    return
  }

  let message = "Internal server error";

  if (error instanceof Error) {
    message = error.message;
  }

  response.status(500).send({ message });
};
