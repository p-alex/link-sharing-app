import { injectable } from "inversify";
import UserRepository from "../modules/user/user.repository";
import SessionRepository from "../modules/session/session.repository";
import SecurityTokenRepository from "../modules/securityToken/securityToken.repository";
import LinkRepository from "../modules/link/link.repository";
import IdentityRepository from "../modules/identity/identity.repository";
import SecurityCodeRepository from "../modules/securityCode/securityCode.repository";

@injectable()
class UnitOfWork {
  constructor(
    public readonly user: UserRepository,
    public readonly session: SessionRepository,
    public readonly securityToken: SecurityTokenRepository,
    public readonly link: LinkRepository,
    public readonly identity: IdentityRepository,
    public readonly securityCode: SecurityCodeRepository,
  ) {}
}

export default UnitOfWork;
