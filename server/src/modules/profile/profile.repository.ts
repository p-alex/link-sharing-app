import { injectable } from "inversify";
import { Database } from "../../database";
import Repository from "../../lib/repository";
import Profile from "./profile.entity";

@injectable()
class ProfileRepository extends Repository<Profile> {
  constructor(private readonly _database: Database) {
    super();
  }

  createNewInstance(entity: Partial<Profile>): Profile {
    const newInstance = this._database.client.getRepository(Profile).create(entity);
    return newInstance;
  }

  async findAll(): Promise<Profile[]> {
    const result = await this._database.client.manager.find(Profile);
    return result;
  }
  async findOneById(id: string): Promise<Profile | null> {
    const result = await this._database.client.getRepository(Profile).findOneBy({ id });
    return result;
  }
  async findOneByUserId(userId: string): Promise<Profile | null> {
    const result = await this._database.client.getRepository(Profile).findOneBy({ userId });
    return result;
  }
  async create(entity: Partial<Profile>): Promise<Partial<Profile>> {
    const result = await this._database.client.manager.save(Profile, entity);
    return result;
  }
  async update(entity: Partial<Profile>): Promise<boolean> {
    await this._database.client
      .createQueryBuilder()
      .update(Profile)
      .set(entity)
      .where("id = :id", { id: entity.id })
      .execute();
    return true;
  }
  async deleteById(id: string): Promise<boolean> {
    await this._database.client
      .createQueryBuilder()
      .delete()
      .from(Profile)
      .where("id = :id", { id })
      .execute();
    return true;
  }
}

export default ProfileRepository;
