import {
  type DeleteResult,
  type FindOptionsWhere,
  type ObjectId,
  type ObjectLiteral,
  type RemoveOptions,
  type Repository,
} from "typeorm";

export abstract class BaseModel<Entity extends ObjectLiteral> {
  protected abstract _repository: Repository<Entity>;

  async findOneBy(where: FindOptionsWhere<Entity> | Array<FindOptionsWhere<Entity>>): Promise<Entity | null> {
    return await this._repository.findOneBy(where);
  }

  async remove(entity: Entity, options?: RemoveOptions): Promise<Entity> {
    return await this._repository.remove(entity, options);
  }

  async delete(
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
    return await this._repository.delete(criteria);
  }
}
