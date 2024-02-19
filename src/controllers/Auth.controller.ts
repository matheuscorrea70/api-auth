import { BaseController } from "./Base.controller";
import { type ActionFunc } from "src/types/request.type";
import { UserTokenModel } from "models/UserToken.model";
import { UserModel } from "models/User.model";
import { UnauthorizedError } from "utils/errors/UnauthorizedError";
import { handleError } from "utils/errors/handleError";

export class AuthController extends BaseController {
  postLogin: ActionFunc = async (request, response) => {
    if (!this.validateRequest(request, response)) {
      return;
    }

    try {
      const email = request.body.email as string;
      const password = request.body.password as string;
      const userModel = new UserModel();

      const { accessToken, refreshToken } = await userModel.login(
        email,
        password
      );

      response.json({ accessToken, refreshToken });
    } catch (error) {
      handleError(error, response);
    }
  };

  postRefreshToken: ActionFunc = async (request, response) => {
    try {
      const refreshToken = request.body.token as string;

      if (!refreshToken) {
        throw new UnauthorizedError(
          "An access token is required to request this resource."
        );
      }

      const tokenModel = new UserTokenModel();

      await tokenModel.refreshToken(refreshToken, (accessToken) => {
        response.json({ accessToken });
      });
    } catch (error) {
      handleError(error, response);
    }
  };

  deleteLogout: ActionFunc = async (request, response) => {
    if (!this.validateRequest(request, response)) {
      return;
    }

    try {
      const refreshToken = request.body.token as string;
      const tokenModel = new UserTokenModel();
      const tokenObj = await tokenModel.findOneBy({ token: refreshToken });

      if (tokenObj !== null) {
        await tokenModel.remove(tokenObj);
      }

      response.sendStatus(204);
    } catch (error) {
      handleError(error, response);
    }
  };
}
