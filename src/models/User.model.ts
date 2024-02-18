import bcrypt from "bcrypt";
import dataSource from "configs/dataSource";
import { BaseModel } from "./Base.model";
import { User } from "./entities/User.entity";
import { TInsertUserPayload, TUpdateUserPayload } from "./types/user.types";
import { UserTokenModel } from "./UserToken.model";
import { NotFoundError } from "utils/errors/NotFoundError";
import { UnauthorizedError } from "utils/errors/UnauthorizedError";

export class UserModel extends BaseModel<User> {
  _repository = dataSource.getRepository(User);

  async insert(data: TInsertUserPayload) {
    const password = await bcrypt.hash(data.password, 10);
    
    return this._repository.save({ ...data, password });
  }

  async update(id: number, data: TUpdateUserPayload) {
    const userObj = await this.findOneBy({ id });

    if (!userObj) {
      throw new NotFoundError("User not found.");
    }

    if (
      (data.newPassword && !data.password) ||
      (data.newPassword &&
        data.password &&
        !bcrypt.compare(data.password, userObj.password))
    ) {
      throw new UnauthorizedError(
        "Authentication failed, password is not valid."
      );
    }

    const newData: Partial<User> = {
      id: id,
      name: data.name,
      email: data.email,
    };

    if (data.newPassword) {
      newData.password = await bcrypt.hash(data.newPassword, 10);
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
}
