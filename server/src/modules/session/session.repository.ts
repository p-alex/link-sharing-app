import { injectable } from "inversify";
import { Database } from "../../database";
import Repository from "../../lib/repository";
import Session from "./session.entity";

@injectable()
class SessionRepository extends Repository<Session> {
  constructor(private readonly _database: Database) {
    super();
  }

  createNewInstance(entity: Partial<Session>): Session {
    return this._database.client.getRepository(Session).create(entity);
  }

  async findAll(): Promise<Session[]> {
    const result = await this._database.manager.find(Session);
    return result;
  }

  async findOneById(id: string): Promise<Session | null> {
    const result = await this._database.manager.findOneBy(Session, { id });
    return result;
  }

  async findBySession(session: string): Promise<Session | null> {
    const result = await this._database.manager.findOneBy(Session, { session });
    return result;
  }

  async create(entity: Partial<Session>): Promise<Session> {
    const result = await this._database.manager.save(Session, entity);
    return result;
  }

  async update(entity: Partial<Session>): Promise<boolean> {
    await this._database.client
      .createQueryBuilder()
      .update(Session)
      .set(entity)
      .where("id = :id", {
        id: entity.id,
      })
      .execute();
    return true;
  }

  async deleteById(id: string): Promise<boolean> {
    await this._database.client
      .createQueryBuilder()
      .delete()
      .from(Session)
      .where("id = :id", { id })
      .execute();
    return true;
  }

  async deleteBySession(userId: string, session: string): Promise<boolean> {
    await this._database.client
      .createQueryBuilder()
      .delete()
      .from(Session)
      .where("userId = :userId AND session = :session", { userId, session })
      .execute();
    return true;
  }

  async deleteAllByUserId(userId: string): Promise<boolean> {
    await this._database.client
      .createQueryBuilder()
      .delete()
      .from(Session)
      .where("userId = :userId", { userId })
      .execute();
    return true;
  }

  async deleteAllOtherSessions(userId: string, currentSessionId: string): Promise<boolean> {
    await this._database.client
      .createQueryBuilder()
      .delete()
      .from(Session)
      .where("userId = :userId AND id != :currentSessionId", {
        userId,
        currentSessionId,
      })
      .execute();
    return true;
  }

  async deleteAllExpiredSessions(userId: string, currentDate: Date): Promise<boolean> {
    await this._database.client
      .createQueryBuilder()
      .delete()
      .from(Session)
      .where("userId = :userId AND expires_at < :currentDate", { userId, currentDate })
      .execute();
    return true;
  }
}

export default SessionRepository;
