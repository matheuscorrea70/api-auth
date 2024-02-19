import type { ValidationChain } from "express-validator";
import { body } from "express-validator";

export const userLoginValidator = (): ValidationChain[] => [
  body("email").isEmail(),
  body("password").isString(),
];

export const userRefreshTokenValidator = (): ValidationChain[] => [body("token").isString()];

export const userLogoutValidator = (): ValidationChain[] => [body("token").isString()];
