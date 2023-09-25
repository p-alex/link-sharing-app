import { injectable } from "inversify";

@injectable()
abstract class Repository<TEntity> {
  abstract findAll(): Promise<TEntity[]>;
  abstract findById(id: string): Promise<TEntity | null>;
  abstract create(entity: Partial<TEntity>): Promise<Partial<TEntity>>;
  abstract update(entity: Partial<TEntity>): Promise<boolean>;
  abstract deleteById(id: string): Promise<boolean>;
}

export default Repository;
