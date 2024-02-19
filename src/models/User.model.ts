import dataSource from "configs/dataSource";
import { BaseModel } from "./Base.model";
import { User } from "./entities/User.entity";
import type {
  TLoginResponse,
  TInsertUserPayload,
  TUpdateUserPayload,
} from "./types/user.types";
import { UserTokenModel } from "./UserToken.model";
import { NotFoundError } from "utils/errors/NotFoundError";
import { UnauthorizedError } from "utils/errors/UnauthorizedError";
import { encryptPassword } from "utils/password/encryptPassword";
import { comparePassword } from "utils/password/comparePasswords";
import { type TUser } from "src/types/user.type";
import { generateAccessToken } from "utils/token/generateAccessToken";
import { generateRefreshToken } from "utils/token/generateRefreshToken";

export class UserModel extends BaseModel<User> {
  _repository = dataSource.getRepository(User);

  async insert(data: TInsertUserPayload): Promise<User> {
    const password = await encryptPassword(data.password);

    return await this._repository.save({ ...data, password });
  }

  async update(id: number, data: TUpdateUserPayload): Promise<User> {
    const userObj = await this.findOneBy({ id });

    if (!userObj) {
      throw new NotFoundError("User not found.");
    }

    if (
      (data.newPassword && !data.password) ??
      (data.newPassword &&
        data.password &&
        !(await comparePassword(data.password, userObj.password)))
    ) {
      throw new UnauthorizedError(
        "Authentication failed, password is not valid."
      );
    }

    const newData: Partial<User> = {
      id,
      name: data.name,
      email: data.email,
    };

    if (data.newPassword) {
      newData.password = await encryptPassword(data.newPassword);
    }

    const user = await this._repository.save(newData);
    const userTokenModel = new UserTokenModel();

    try {
      await userTokenModel.delete({ user: { id: user.id } });
    } catch (error) {
      console.error(error);
    }

    return user;
  }

  async login(email: string, password: string): Promise<TLoginResponse> {
    const userObj = await this.findOneBy({ email });

    if (!userObj || !(await comparePassword(password, userObj.password))) {
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

    return { accessToken, refreshToken };
  }
}
