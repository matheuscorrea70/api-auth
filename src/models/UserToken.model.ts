import dataSource from "configs/dataSource";
import { BaseModel } from "./Base.model";
import { UserToken } from "./entities/UserToken.entity";

export class UserTokenModel extends BaseModel<UserToken> {
  _repository = dataSource.getRepository(UserToken);

  save(userId: number, token: string) {
    return this._repository.save({ user: { id: userId }, token });
  }
}
