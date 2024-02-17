import dataSource from "configs/dataSource";
import { BaseModel } from "./Base.model";
import { User } from "./entities/User.entity";
import { TSaveUserPayload } from "./types/user.types";
import { UserTokenModel } from "./UserToken.model";

export class UserModel extends BaseModel<User> {
  _repository = dataSource.getRepository(User);

  insert(data: TSaveUserPayload) {
    return this._repository.save(data);
  }

  async update(id: number, data: Partial<TSaveUserPayload>) {
    const user = await this._repository.save({ ...data, id });
    const userTokenModel = new UserTokenModel();

    try {
      await userTokenModel.delete({ user: { id: user.id } });
    } catch (error) {
      console.error(error);
    }

    return user;
  }
}
