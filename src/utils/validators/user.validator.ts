import { body } from "express-validator";

export const userLoginValidator = () => [
  body("email").isEmail(),
  body("password").isString(),
];

export const userRefreshTokenValidator = () => [body("token").isString()];

export const userLogoutValidator = () => [body("token").isString()];
