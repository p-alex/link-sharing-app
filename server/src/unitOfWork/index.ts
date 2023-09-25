import { injectable } from "inversify";
import UserRepository from "../modules/user/user.repository";
import SessionRepository from "../modules/session/session.repository";

@injectable()
class UnitOfWork {
  constructor(
    public readonly user: UserRepository,
    public readonly session: SessionRepository,
  ) {}
}

export default UnitOfWork;
