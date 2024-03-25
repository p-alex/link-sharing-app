import { injectable } from "inversify";
import UserRepository from "../modules/user/user.repository";
import SessionRepository from "../modules/session/session.repository";
import SecurityTokenRepository from "../modules/securityToken/securityToken.repository";
import LinkRepository from "../modules/link/link.repository";
import IdentityRepository from "../modules/identity/identity.repository";
import SecurityCodeRepository from "../modules/securityCode/securityCode.repository";
import ProfileRepository from "../modules/profile/profile.repository";

@injectable()
class UnitOfWork {
  constructor(
    public readonly user: UserRepository,
    public readonly session: SessionRepository,
    public readonly securityToken: SecurityTokenRepository,
    public readonly link: LinkRepository,
    public readonly identity: IdentityRepository,
    public readonly securityCode: SecurityCodeRepository,
    public readonly profile: ProfileRepository,
  ) {}
}

export default UnitOfWork;
