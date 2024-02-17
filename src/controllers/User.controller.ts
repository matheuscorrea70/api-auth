import { BaseController } from "./Base.controller";
import { ActionFunc } from "src/types/request.type";
import { UserModel } from "models/User.model";

export class UserController extends BaseController {
  getOne: ActionFunc = async (request, response) => {
    try {
      const id = request.user?.id;
      const userModel = new UserModel();
      const userObj = await userModel.findOneBy({ id });

      if (!userObj) {
        return response.status(404).json({ message: "User not found." });
      }

      response.json({ ...userObj, password: undefined });
    } catch (error) {
      response.status(500).send({
        message: "Internal server error.",
        error,
      });
    }
  };

  post: ActionFunc = async (request, response) => {
    try {
      const name = request.body.name as string;
      const email = request.body.email as string;
      const password = request.body.password as string;

      const userModel = new UserModel();
      const tokenObj = await userModel.insert({ name, email, password });

      response.json(tokenObj);
    } catch (error) {
      response.status(500).send({
        message: "Internal server error.",
        error,
      });
    }
  };

  put: ActionFunc = async (request, response) => {
    try {
      const id = request.user?.id;

      if (!id) {
        return response.status(404).json({ message: "User not found." });
      }

      const email = request.body.email as string;
      const name = request.body.name as string;
      const password = request.body.password as string;
      const newPassword = request.body.newPassword as string;
      const userModel = new UserModel();
      const userObj = await userModel.findOneBy({ id });

      if (!userObj) {
        return response.status(404).json({ message: "User not found." });
      }

      if (newPassword && password !== userObj.password) {
        return response.status(401).send({
          message: "Authentication failed: Password is not valid.",
        });
      }

      const tokenObj = await userModel.update(id, {
        name: name || userObj.name,
        email: email || userObj.email,
        password: newPassword || userObj.password,
      });

      response.json(tokenObj);
    } catch (error) {
      response.status(500).send({
        message: "Internal server error.",
        error,
      });
    }
  };
}
