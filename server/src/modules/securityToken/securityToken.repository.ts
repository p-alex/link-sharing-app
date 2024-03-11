import { injectable } from "inversify";
import { Database } from "../../database";
import Repository from "../../lib/repository";
import SecurityToken from "./securityToken.entity";

@injectable()
class SecurityTokenRepository extends Repository<SecurityToken> {
  constructor(private readonly _database: Database) {
    super();
  }

  async findAll(): Promise<SecurityToken[]> {
    const result = await this._database.manager.find(SecurityToken);
    return result;
  }

  findOneById(_id: string): Promise<SecurityToken | null> {
    throw new Error("Method not implemented.");
  }

  async findOneByToken(token: string): Promise<SecurityToken | null> {
    const result = await this._database.manager.findOneBy(SecurityToken, { token });
    return result;
  }

  async create(entity: Partial<SecurityToken>): Promise<Partial<SecurityToken>> {
    const result = await this._database.manager.save(SecurityToken, entity);
    return result;
  }

  async update(entity: Partial<SecurityToken>): Promise<boolean> {
    await this._database.manager
      .createQueryBuilder()
      .update(SecurityToken)
      .set(entity)
      .where("token = :token", { token: entity.token })
      .execute();
    return true;
  }

  deleteById(_id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async deleteByToken(token: string): Promise<boolean> {
    await this._database.manager
      .createQueryBuilder()
      .delete()
      .from(SecurityToken)
      .where("token = :token", { token })
      .execute();

    return true;
  }
}

export default SecurityTokenRepository;
