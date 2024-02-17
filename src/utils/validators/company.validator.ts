import { body } from "express-validator";
import { CompanySize } from "models/types/company.types";

export const bodyCompanyValidator = () => [
  body("name").isString(),
  body("size").isIn(Object.values(CompanySize)),
];
