import { param } from "express-validator";

export const paramIdValidator = () => [param("id").isNumeric()];
