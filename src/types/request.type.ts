import { type Request, type Response, type NextFunction } from "express";
import { type TUser } from "./user.type";

export type CustomRequest = {
  user?: TUser;
} & Request;

export type MiddlewareFunc = (
  request: CustomRequest,
  response: Response,
  next: NextFunction
) => void;

export type ActionFunc = (request: CustomRequest, response: Response) => void;
