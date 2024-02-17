import { Router } from "express";

import { UserController } from "controllers/User.controller";
import { authenticateToken } from "utils/token/authenticateToken";
import { body } from "express-validator";

const controller = new UserController();
const router = Router();

router.get("/", authenticateToken, controller.getOne);

router.post(
  "/",
  body("email").isEmail(),
  body("name").isString(),
  body("password").isString(),
  controller.post
);

router.put(
  "/:id",
  body("email").isEmail().optional(),
  body("name").isString().optional(),
  body("password").isString().optional(),
  body("newPassword").isString().optional(),
  authenticateToken,
  controller.put
);

export default router;
