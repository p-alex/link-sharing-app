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
import CodeGenerator from "./utils/codeGenerator";
import SecurityTokenRepository from "./modules/securityToken/securityToken.repository";
import LinkRepository from "./modules/link/link.repository";
import LinkService from "./modules/link/link.service";
import RandomIdentifier from "./utils/randomIdentifier";
import IdentityRepository from "./modules/identity/identity.repository";
import SecurityStringVerifier from "./utils/securityStringVerifier";
import CloudManager from "./utils/cloud/CloudManager";
import CloudinaryCloudApi from "./utils/cloud/CloudinaryCloudApi";
import EmailSender from "./utils/mailer/EmailSender";
import { MailjetSMTPServer } from "./utils/mailer/smtpServers";
import NodemailerEmailApi from "./utils/mailer/NodemailerEmailApi";
import SMTPServer from "./utils/mailer/smtpServers/SMTPServer";
import ProfileRepository from "./modules/profile/profile.repository";
import ProfileService from "./modules/profile/profile.service";
import LocalSMTPServer from "./utils/mailer/smtpServers/LocalSMTPServer";
import VercelController from "./modules/vercel.controller";

export const container = new Container({ defaultScope: "Singleton" });

container.bind(Database).toSelf();
container.bind(UnitOfWork).toSelf();

//VERCEL
container.bind(VercelController).toSelf();

//USER
container.bind(UserController).toSelf();
container.bind(UserService).toSelf();
container.bind(UserRepository).toSelf();

// SESSION
container.bind(SessionController).toSelf();
container.bind(SessionService).toSelf();
container.bind(SessionRepository).toSelf();

// LINK
container.bind(LinkService).toSelf();
container.bind(LinkRepository).toSelf();

// SECURITY TOKEN
container.bind(SecurityTokenRepository).toSelf();

// AUTH
container.bind(AuthController).toSelf();
container.bind(AuthService).toSelf();
container.bind(OAuthStrategy).toSelf();

// IDENTITY
container.bind(IdentityRepository).toSelf();

// PROFILE
container.bind(ProfileService).toSelf();
container.bind(ProfileRepository).toSelf();

// UTILS
container.bind(Cryptography).toSelf();
container.bind(Jwt).toSelf();
container.bind(TimeConverter).toSelf();
container.bind(SecurePasswordGenerator).toSelf();
container.bind(CodeGenerator).toSelf();
container.bind(RandomIdentifier).toSelf();
container.bind(SecurityStringVerifier).toSelf();

// CLOUD MANAGER
container.bind(CloudManager).toSelf();
container.bind(CloudinaryCloudApi).toSelf();

// EMAIL SENDER
container.bind(EmailSender).toSelf();
container.bind(NodemailerEmailApi).toSelf();
container.bind(SMTPServer).toSelf();
container.bind(MailjetSMTPServer).toSelf();
container.bind(LocalSMTPServer).toSelf();
