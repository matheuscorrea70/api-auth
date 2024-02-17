import { query } from "express-validator";

export const queryPaginationValidator = () => [
  query("page").isNumeric().optional(),
  query("limit").isNumeric().optional(),
];
