import dataSource from "configs/dataSource";
import { BaseModel } from "./Base.model";
import { User } from "./entities/User.entity";
import { TSaveUserPayload } from "./types/user.types";

export class UserModel extends BaseModel<User> {
  _repository = dataSource.getRepository(User);

  insert(data: TSaveUserPayload) {
    return this._repository.save(data);
  }

  update(id: number, data: Partial<TSaveUserPayload>) {
    return this._repository.save({ ...data, id });
  }
}
