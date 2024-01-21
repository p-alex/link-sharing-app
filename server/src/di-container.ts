import { Container } from "inversify";
import UserService from "./modules/user/user.service";
import UserRepository from "./modules/user/user.repository";
import { Database } from "./database";
import { UserController } from "./modules/user/user.controller";
import UnitOfWork from "./unitOfWork";
import Cryptography from "./utils/cryptography";
import Jwt from "./utils/jwt";
import { TimeConverter } from "./utils/timeConverter";
import AuthController from "./modules/auth/auth.controller";
import AuthService from "./modules/auth/auth.service";
import SessionRepository from "./modules/session/session.repository";
import SessionService from "./modules/session/session.service";
import SessionController from "./modules/session/session.controller";
import SecurePasswordGenerator from "./utils/securePasswordGenerator";
import OAuthStrategy from "./modules/auth/oauth.strategy";
import Mailer from "./utils/mailer";
import EmailVerificationTemplate from "./emailTemplates/EmailVerificationTemplate";
import CodeGenerator from "./utils/codeGenerator";
import VerificationTokenRepository from "./modules/verificationToken/verificationToken.repository";
import ForgetPasswordVerificationTemplate from "./emailTemplates/ResetPasswordVerificationTemplate";
import VerificationTokenVerifier from "./utils/verificationTokenVerifier";
import LinkRepository from "./modules/link/link.repository";
import LinkService from "./modules/link/link.service";
import RandomIdentifier from "./utils/randomIdentifier";
import IdentityRepository from "./modules/identity/identity.repository";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(Database).toSelf();
container.bind(UnitOfWork).toSelf();

container.bind(UserController).toSelf();
container.bind(UserService).toSelf();
container.bind(UserRepository).toSelf();

container.bind(SessionController).toSelf();
container.bind(SessionService).toSelf();
container.bind(SessionRepository).toSelf();

container.bind(LinkService).toSelf();
container.bind(LinkRepository).toSelf();

container.bind(VerificationTokenRepository).toSelf();

container.bind(AuthController).toSelf();
container.bind(AuthService).toSelf();

container.bind(OAuthStrategy).toSelf();

container.bind(IdentityRepository).toSelf();

container.bind(Cryptography).toSelf();
container.bind(Jwt).toSelf();
container.bind(TimeConverter).toSelf();
container.bind(SecurePasswordGenerator).toSelf();
container.bind(CodeGenerator).toSelf();
container.bind(RandomIdentifier).toSelf();

container.bind(Mailer).toSelf();
container.bind(EmailVerificationTemplate).toSelf();
container.bind(ForgetPasswordVerificationTemplate).toSelf();
container.bind(VerificationTokenVerifier).toSelf();
