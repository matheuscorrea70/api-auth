import { Request, Response, NextFunction } from "express";
import { TUser } from "./user.type";

export type CustomRequest = {
  user?: TUser;
} & Request;

export type MiddlewareFunc = (
  request: CustomRequest,
  response: Response,
  next: NextFunction
) => void;

export type ActionFunc = (request: CustomRequest, response: Response) => void;
