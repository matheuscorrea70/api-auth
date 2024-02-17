import { Response } from "express";

import { CustomError } from "./CustomErro";

export const handleError = (
  error: CustomError | Error | unknown,
  response: Response
) => {
  if (error instanceof CustomError) {
    return response.status(error.status).send(error);
  }

  let message = "Internal server error";

  if (error instanceof Error) {
    message = error.message;
  }

  return response.status(500).send({ message });
};
