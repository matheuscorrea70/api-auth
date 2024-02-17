import { JwtPayload } from "jsonwebtoken";
import { BaseController } from "./Base.controller";
import { ActionFunc } from "src/types/request.type";
import { generateAccessToken } from "utils/token/generateAccessToken";
import { generateRefreshToken } from "utils/token/generateRefreshToken";
import { UserTokenModel } from "models/UserToken.model";
import { verifyRefreshToken } from "utils/token/verifyRefreshToken";
import { TUser } from "src/types/user.type";
import { UserModel } from "models/User.model";

export class AuthController extends BaseController {
  postLogin: ActionFunc = async (request, response) => {
    try {
      const email = request.body.email as string;
      const password = request.body.password as string;
      const userModel = new UserModel();
      const userObj = await userModel.findOneBy({ email, password });

      if (!userObj) {
        return response.status(401).send({
          message:
            "Authentication failed: User email or password is not valid.",
        });
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
      response.status(500).send({
        message: "Internal server error.",
        error,
      });
    }
  };

  postRefreshToken: ActionFunc = async (request, response) => {
    try {
      const refreshToken = request.body.token as string;

      if (!refreshToken) {
        return response.status(401).send({
          message: "An access token is required to request this resource.",
        });
      }

      const tokenModel = new UserTokenModel();
      const tokenObj = await tokenModel.findOneBy({ token: refreshToken });

      if (!tokenObj) {
        return response
          .status(403)
          .send({ message: "Authentication failed: Token is not valid." });
      }

      verifyRefreshToken(refreshToken, (error, jwtUser) => {
        if (error) {
          return response
            .status(403)
            .send({ message: "Authentication failed: Token is not valid." });
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
      response.status(500).send({
        message: "Internal server error.",
        error,
      });
    }
  };

  deleteLogout: ActionFunc = async (request, response) => {
    try {
      const refreshToken = request.body.token as string;
      const tokenModel = new UserTokenModel();
      const tokenObj = await tokenModel.findOneBy({ token: refreshToken });

      if (tokenObj) {
        tokenModel.remove(tokenObj);
      }

      response.sendStatus(204);
    } catch (error) {
      response.status(500).send({
        message: "Internal server error.",
        error,
      });
    }
  };
}