import { injectable } from "inversify";
import UserRepository from "../modules/user/user.repository";
import SessionRepository from "../modules/session/session.repository";
import VerificationTokenRepository from "../modules/verificationToken/verificationToken.repository";

@injectable()
class UnitOfWork {
  constructor(
    public readonly user: UserRepository,
    public readonly session: SessionRepository,
    public readonly verificationToken: VerificationTokenRepository,
  ) {}
}

export default UnitOfWork;
