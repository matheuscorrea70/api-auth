import { body } from "express-validator";
import { JobLevel, JobLocationType, JobType } from "models/types/job.types";

export const bodyJobValidator = () => [
  body(["title", "description"]).isString(),
  body("url").isURL(),
  body("company").custom(async (value) => {
    if (!value?.id && !value?.name) {
      throw new Error("Invalid company!");
    }
  }),
  body("type").isIn(Object.values(JobType)),
  body("level").isIn(Object.values(JobLevel)),
  body("locationType").isIn(Object.values(JobLocationType)),
  body("skills").isArray(),
  body("skills.*").isString(),
  body("company.id").isNumeric().optional(),
  body("company.name").isString().optional(),
  body("country").isObject(),
  body("country.id").isString(),
  body("province").isObject().optional(),
  body("province.id").isNumeric().optional(),
];
