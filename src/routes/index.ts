import { Router } from "express";
import user from "./user.route";
import auth from "./auth.route";

const routes = Router();

routes.use("/v1/auth", auth);
routes.use("/v1/user", user);

export { routes };
