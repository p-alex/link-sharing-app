import { injectable } from "inversify";
import { Database } from "../../database";
import Repository from "../../lib/repository";
import SecurityCode from "./securityCode.entity";

@injectable()
class SecurityCodeRepository extends Repository<SecurityCode> {
  constructor(private readonly _database: Database) {
    super();
  }

  createNewInstance(entity: Partial<SecurityCode>): SecurityCode {
    return this._database.client.getRepository(SecurityCode).create(entity);
  }

  async findAll(): Promise<SecurityCode[]> {
    const result = await this._database.client.manager.find(SecurityCode);
    return result;
  }
  findOneById(id: string): Promise<SecurityCode | null> {
    throw new Error("Method not implemented.");
  }
  async findOneByUserIdAndCode(userId: string, code: string) {
    const result = await this._database.client
      .getRepository(SecurityCode)
      .createQueryBuilder("securityCode")
      .where("securityCode.user = :userId AND securityCode.code = :code", { userId, code })
      .getOne();
    return result;
  }
  async create(entity: Partial<SecurityCode>): Promise<Partial<SecurityCode>> {
    const result = await this._database.manager.save(SecurityCode, entity);
    return result;
  }
  update(entity: Partial<SecurityCode>): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async deleteByUserIdAndCode(userId: string, code: string) {
    await this._database.client
      .createQueryBuilder()
      .delete()
      .from(SecurityCode)
      .where("userId = :userId AND code = :code", { userId, code })
      .execute();
    return true;
  }
}

export default SecurityCodeRepository;
