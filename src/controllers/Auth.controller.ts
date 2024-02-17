import { JwtPayload } from "jsonwebtoken";
import { BaseController } from "./Base.controller";
import { ActionFunc } from "src/types/request.type";
import { generateAccessToken } from "utils/token/generateAccessToken";
import { generateRefreshToken } from "utils/token/generateRefreshToken";
import { UserTokenModel } from "models/UserToken.model";
import { verifyRefreshToken } from "utils/token/verifyRefreshToken";
import { TUser } from "src/types/user.type";
import { UserModel } from "models/User.model";
import { UnauthorizedError } from "utils/errors/UnauthorizedError";
import { handleError } from "utils/errors/handleError";
import { ForbiddenError } from "utils/errors/ForbiddenError";

export class AuthController extends BaseController {
  postLogin: ActionFunc = async (request, response) => {
    if (!this.validateRequest(request, response)) {
      return;
    }

    try {
      const email = request.body.email as string;
      const password = request.body.password as string;
      const userModel = new UserModel();
      const userObj = await userModel.findOneBy({ email, password });

      if (!userObj) {
        throw new UnauthorizedError(
          "Authentication failed, email or password is not valid."
        );
      }

      const user: TUser = {
        id: userObj.id,
        name: userObj.name,
        email: userObj.email,
        password: userObj.password,
      };

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      const userTokenModel = new UserTokenModel();

      await userTokenModel.save(user.id, refreshToken);

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
      const tokenObj = await tokenModel.findOneBy({ token: refreshToken });

      if (!tokenObj) {
        throw new ForbiddenError("Token is not valid.");
      }

      verifyRefreshToken(refreshToken, (error, jwtUser) => {
        if (error) {
          throw new ForbiddenError("Token is not valid.");
        }

        const user = jwtUser as TUser & JwtPayload;
        const accessToken = generateAccessToken({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        });

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

      if (tokenObj) {
        tokenModel.remove(tokenObj);
      }

      response.sendStatus(204);
    } catch (error) {
      handleError(error, response);
    }
  };
}
