import Repository from "../../lib/repository";
import User from "./user.entity";
import { injectable } from "inversify";
import { Database } from "../../database";

@injectable()
class UserRepository extends Repository<User> {
  constructor(private readonly _database: Database) {
    super();
  }

  createNewInstance(entity: Partial<User>): User {
    return this._database.client.getRepository(User).create(entity);
  }

  async findAll(): Promise<User[]> {
    const result = await this._database.manager.find(User);
    return result;
  }

  async findOneById(id: string): Promise<User | null> {
    const result = await this._database.manager.findOneBy(User, { id });
    return result;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const result = await this._database.manager.findOneBy(User, { email });
    return result;
  }

  async create(entity: Partial<User>): Promise<User> {
    const newUser = await this._database.manager.save(User, entity);
    return newUser;
  }

  async update(entity: Partial<User>): Promise<boolean> {
    await this._database.manager
      .createQueryBuilder()
      .update(User)
      .set(entity)
      .where("id = :id", { id: entity.id })
      .execute();
    return true;
  }

  async deleteById(id: string): Promise<boolean> {
    await this._database.manager.delete(User, { id });
    return true;
  }
}

export default UserRepository;
