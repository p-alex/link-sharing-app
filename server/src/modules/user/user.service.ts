import { injectable } from "inversify";
import User from "./user.entity";
import AlreadyExistsException from "../../exceptions/AlreadyExistsException";
import { CreateUserInput } from "./user.schema";
import UnitOfWork from "../../unitOfWork";
import Cryptography from "../../utils/cryptography";
import { TimeConverter } from "../../utils/timeConverter";
import Jwt from "../../utils/jwt";
import InvalidCredentialsException from "../../exceptions/InvalidCredentialsException";
import SecurityStringVerifier from "../../utils/securityStringVerifier";
import EmailSender from "../../utils/mailer/EmailSender";
import CloudManager from "../../utils/cloud/CloudManager";

@injectable()
class UserService {
  constructor(
    private readonly _unitOfWork: UnitOfWork,
    private readonly _cryptography: Cryptography,
    private readonly _timeConverter: TimeConverter,
    private readonly _jwt: Jwt,
    private readonly _securityStringVerifier: SecurityStringVerifier,
    private readonly _emailSender: EmailSender,
    private readonly _cloudManager: CloudManager,
  ) {}

  async create(userInput: CreateUserInput): Promise<{ id: string }> {
    const userWithEmail = await this._unitOfWork.user.findOneByEmail(userInput.email);

    if (userWithEmail) throw new AlreadyExistsException("A user with that email already exists");

    const hashedPassword = await this._cryptography.slowHash(userInput.password);

    const newUser = await this._unitOfWork.user.create({
      email: userInput.email,
      password: hashedPassword,
    });

    await this._unitOfWork.profile.create({ user: newUser, userId: newUser.id });

    const securityTokenExpireMs = this._timeConverter.toMs(24, "hour");

    const securityToken = this._jwt.signJwt(
      { id: newUser.id },
      "EMAIL_VERIFICATION_TOKEN_SECRET",
      this._timeConverter.toSeconds(securityTokenExpireMs, "milisecond"),
    );

    await this._unitOfWork.securityToken.create({
      userId: newUser.id,
      token: this._cryptography.fastHash(securityToken),
      expires_at: new Date(Date.now() + securityTokenExpireMs),
    });

    await this._emailSender.sendAccountVerificationEmail({
      to: newUser.email,
      token: securityToken,
    });

    return { id: newUser.id! };
  }

  async update(user: Partial<User>) {
    await this._unitOfWork.user.update(user);
    return true;
  }

  async delete(user: Partial<User>) {
    await this._unitOfWork.user.deleteById(user.id!);
    return true;
  }

  async forgetPassword(email: string) {
    const user = await this._unitOfWork.user.findOneByEmail(email);

    if (!user) return true;

    const securityTokenExpireMs = this._timeConverter.toMs(24, "hour");

    const securityToken = this._jwt.signJwt(
      { id: user.id },
      "RESET_PASSWORD_VERIFICATION_TOKEN_SECRET",
      this._timeConverter.toSeconds(securityTokenExpireMs, "milisecond"),
    );

    await this._unitOfWork.securityToken.create({
      userId: user.id,
      user,
      token: this._cryptography.fastHash(securityToken),
      expires_at: new Date(Date.now() + securityTokenExpireMs),
    });

    await this._emailSender.sendResetPasswordVerificationEmail({
      to: user.email,
      token: securityToken,
    });

    return true;
  }

  async resetPasswordConfirmation(token: string) {
    const { tokenPayload } = await this._securityStringVerifier.verifyToken<{
      id: string;
    }>(token, "RESET_PASSWORD_VERIFICATION_TOKEN_SECRET");

    const user = await this._unitOfWork.user.findOneById(tokenPayload.id);

    if (!user) throw new Error("User does not exist");

    return true;
  }

  async resetPassword(newPassword: string, token: string) {
    const { tokenPayload, hashedToken } = await this._securityStringVerifier.verifyToken<{
      id: string;
    }>(token, "RESET_PASSWORD_VERIFICATION_TOKEN_SECRET");

    const user = await this._unitOfWork.user.findOneById(tokenPayload.id);

    if (!user) throw new Error("User does not exist");

    const hashedPassword = await this._cryptography.slowHash(newPassword);

    await this._unitOfWork.user.update({
      ...user,
      password: hashedPassword,
    });

    await this._unitOfWork.securityToken.deleteByToken(hashedToken);

    await this._unitOfWork.session.deleteAllByUserId(user.id);

    return true;
  }

  async changePassword(
    userId: string,
    sessionId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user = await this._unitOfWork.user.findOneById(userId);
    if (!user) throw new Error("User does not exist");
    const isValidUserPassword = await this._cryptography.verifySlowHash(oldPassword, user.password);
    if (!isValidUserPassword) throw new InvalidCredentialsException("Password is incorrect");
    const newHashedPassword = await this._cryptography.slowHash(newPassword);
    const newUser = { ...user, password: newHashedPassword };
    await this._unitOfWork.user.update(newUser);
    await this._unitOfWork.session.deleteAllOtherSessions(userId, sessionId);
    return true;
  }

  async checkPassword(userId: string, password: string) {
    const user = await this._unitOfWork.user.findOneById(userId);
    if (!user) throw new Error("User does not exist");
    const isValidPassword = await this._cryptography.verifySlowHash(password, user.password);
    if (!isValidPassword) throw new InvalidCredentialsException("Password is incorrect");
    return true;
  }

  async deleteRequest(userId: string) {
    const user = await this._unitOfWork.user.findOneById(userId);
    if (!user) throw new Error("A user with that user id does not exist");
    await this._unitOfWork.user.deleteById(userId);
    await this._unitOfWork.profile.deleteById(user.profileId);
    await this._cloudManager.deleteImage(user.profileId);
    return true;
  }
}

export default UserService;
