import {
  DeleteResult,
  FindOptionsWhere,
  ObjectId,
  ObjectLiteral,
  RemoveOptions,
  Repository,
} from "typeorm";

export abstract class BaseModel<Entity extends ObjectLiteral> {
  protected abstract _repository: Repository<Entity>;

  findOneBy(where: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[]) {
    return this._repository.findOneBy(where);
  }

  remove(entity: Entity, options?: RemoveOptions) {
    return this._repository.remove(entity, options);
  }

  delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<Entity>
  ): Promise<DeleteResult> {
    return this._repository.delete(criteria);
  }
}
