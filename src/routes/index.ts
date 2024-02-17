import { Router } from "express";
import { UserController } from "controllers/User.controller";

const controller = new UserController();
const router = Router();

router.post("v1/login", controller.postLogin);
router.delete("v1/logout", controller.deleteLogout);
router.post("v1/refreshToken", controller.postRefreshToken);

export { router };
