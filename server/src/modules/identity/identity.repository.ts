import { injectable } from "inversify";
import Repository from "../../lib/repository";
import Identity, { OAuthProvidersType } from "./identity.entity";
import { Database } from "../../database";
import User from "../user/user.entity";

@injectable()
class IdentityRepository extends Repository<Identity> {
  constructor(private readonly _database: Database) {
    super();
  }
  async findAll(): Promise<Identity[]> {
    const result = await this._database.client.manager.find(Identity);
    return result;
  }
  async findAllByUserId(user: Partial<User>): Promise<Identity[]> {
    const result = await this._database.client.manager.findBy(Identity, { user: user });
    return result;
  }
  async findOneById(id: string): Promise<Identity | null> {
    const result = await this._database.client.manager.findOne(Identity, { where: { id } });
    return result;
  }
  async findOneByUserIdAndProvider(
    user: Partial<User>,
    provider: OAuthProvidersType,
  ): Promise<Identity | null> {
    const result = await this._database.client.manager.findOneBy(Identity, { user, provider });
    return result;
  }
  async create(entity: Partial<Identity>): Promise<Partial<Identity>> {
    const result = await this._database.client.manager.save(Identity, entity);
    return result;
  }
  async update(entity: Partial<Identity>): Promise<boolean> {
    await this._database.client.manager
      .createQueryBuilder()
      .update(Identity)
      .set(entity)
      .where("id = :id", { id: entity.id })
      .execute();
    return true;
  }
  async deleteById(id: string): Promise<boolean> {
    await this._database.client.manager
      .createQueryBuilder()
      .delete()
      .from(Identity)
      .where("id = :id", { id })
      .execute();
    return true;
  }
}

export default IdentityRepository;
