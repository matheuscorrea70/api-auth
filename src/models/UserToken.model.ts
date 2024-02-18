import dataSource from "configs/dataSource";
import { BaseModel } from "./Base.model";
import { UserToken } from "./entities/UserToken.entity";
import { ForbiddenError } from "utils/errors/ForbiddenError";
import { verifyRefreshToken } from "utils/token/verifyRefreshToken";
import { generateAccessToken } from "utils/token/generateAccessToken";
import { TUser } from "src/types/user.type";
import { JwtPayload } from "jsonwebtoken";

export class UserTokenModel extends BaseModel<UserToken> {
  _repository = dataSource.getRepository(UserToken);

  save(userId: number, token: string) {
    return this._repository.save({ user: { id: userId }, token });
  }

  async refreshToken(
    refreshToken: string,
    callback: (callback: string) => void
  ) {
    const tokenObj = await this.findOneBy({ token: refreshToken });

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

      callback(accessToken);
    });
  }
}
