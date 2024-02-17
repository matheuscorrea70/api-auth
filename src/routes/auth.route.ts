import { Router } from "express";
import { body } from "express-validator";
import { AuthController } from "controllers/Auth.controller";

const controller = new AuthController();
const router = Router();

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isString(),
  controller.postLogin
);

router.delete("/logout", body("token").isString(), controller.deleteLogout);

router.post(
  "/refresh-token",
  body("token").isString(),
  controller.postRefreshToken
);

export default router;
