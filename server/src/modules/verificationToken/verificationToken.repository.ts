import { injectable } from "inversify";
import { Database } from "../../database";
import Repository from "../../lib/repository";
import VerificationToken from "./verificationToken.entity";

@injectable()
class VerificationTokenRepository extends Repository<VerificationToken> {
  constructor(private readonly _database: Database) {
    super();
  }
  async findAll(): Promise<VerificationToken[]> {
    const result = await this._database.manager.find(VerificationToken);
    return result;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOneById(_id: string): Promise<VerificationToken | null> {
    throw new Error("Method not implemented.");
  }
  async findOneByToken(token: string): Promise<VerificationToken | null> {
    const result = await this._database.manager.findOneBy(VerificationToken, { token });
    return result;
  }
  async create(entity: Partial<VerificationToken>): Promise<Partial<VerificationToken>> {
    const result = await this._database.manager.save(VerificationToken, entity);
    return result;
  }
  async update(entity: Partial<VerificationToken>): Promise<boolean> {
    await this._database.manager
      .createQueryBuilder()
      .update(VerificationToken)
      .set(entity)
      .where("token = :token", { token: entity.token })
      .execute();
    return true;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteById(_id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  async deleteByToken(token: string): Promise<boolean> {
    await this._database.manager
      .createQueryBuilder()
      .delete()
      .from(VerificationToken)
      .where("token = :token", { token })
      .execute();
    return true;
  }
}

export default VerificationTokenRepository;
