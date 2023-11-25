import { injectable } from "inversify";
import { Database } from "../../database";
import Repository from "../../lib/repository";
import Link from "./link.entity";

@injectable()
class LinkRepository extends Repository<Link> {
  constructor(private readonly _database: Database) {
    super();
  }
  async findAll(): Promise<Link[]> {
    const result = await this._database.manager.find(Link);
    return result;
  }
  async findOneById(id: string): Promise<Link | null> {
    const result = await this._database.manager.findOneBy(Link, { id });
    return result;
  }
  async findAllByUserId(userId: string): Promise<Link[]> {
    const result = await this._database.manager
      .getRepository(Link)
      .createQueryBuilder("link")
      .where("link.user = :userId", { userId })
      .getMany();
    return result;
  }
  async create(entity: Partial<Link>): Promise<Partial<Link>> {
    const result = await this._database.manager.save(Link, entity);
    return result;
  }
  async saveMany(entities: Partial<Link>[]) {
    await this._database.manager.getRepository(Link).save(entities);
    return true;
  }
  async update(entity: Partial<Link>): Promise<boolean> {
    await this._database.manager
      .createQueryBuilder()
      .update(Link)
      .set(entity)
      .where("id = :id", { id: entity.id })
      .execute();
    return true;
  }
  async deleteById(entity: Partial<Link>): Promise<boolean> {
    await this._database.manager
      .createQueryBuilder()
      .delete()
      .from(Link)
      .where("id = :id", { id: entity.id })
      .execute();
    return true;
  }
}

export default LinkRepository;
