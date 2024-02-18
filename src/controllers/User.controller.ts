import { BaseController } from "./Base.controller";
import { ActionFunc } from "src/types/request.type";
import { UserModel } from "models/User.model";
import { handleError } from "utils/errors/handleError";
import { NotFoundError } from "utils/errors/NotFoundError";

export class UserController extends BaseController {
  getOne: ActionFunc = async (request, response) => {
    try {
      const id = request.user?.id;
      const userModel = new UserModel();
      const userObj = await userModel.findOneBy({ id });

      if (!userObj) {
        throw new NotFoundError("User not found.");
      }

      response.json({ ...userObj, password: undefined });
    } catch (error) {
      handleError(error, response);
    }
  };

  post: ActionFunc = async (request, response) => {
    if (!this.validateRequest(request, response)) {
      return;
    }

    try {
      const name = request.body.name as string;
      const email = request.body.email as string;
      const password = request.body.password as string;

      const userModel = new UserModel();
      const tokenObj = await userModel.insert({ name, email, password });

      response.json(tokenObj);
    } catch (error) {
      handleError(error, response);
    }
  };

  put: ActionFunc = async (request, response) => {
    if (!this.validateRequest(request, response)) {
      return;
    }

    try {
      const id = request.user?.id;

      if (!id) {
        throw new NotFoundError("User not found.");
      }

      const email = request.body.email as string;
      const name = request.body.name as string;
      const password = request.body.password as string;
      const newPassword = request.body.newPassword as string;
      const userModel = new UserModel();

      const tokenObj = await userModel.update(id, {
        name: name,
        email: email,
        password: password,
        newPassword: newPassword
      });

      response.json(tokenObj);
    } catch (error) {
      handleError(error, response);
    }
  };
}
