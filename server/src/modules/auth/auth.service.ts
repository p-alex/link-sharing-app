import { injectable } from "inversify";
import UnitOfWork from "../../unitOfWork";
import Hash from "../../utils/hash";
import Jwt from "../../utils/jwt";
import { EmailSignInInput } from "./auth.schema";
import { TimeConverter } from "../../utils/timeConverter";
import InvalidCredentialsException from "../../exceptions/InvalidCredentialsException";
import SecurePasswordGenerator from "../../utils/securePasswordGenerator";
import User, { OAuthProvidersType } from "../user/user.entity";
import OAuthStrategy from "./oauth.strategy";
import ValidationTokenVerifier from "../../utils/verificationTokenVerifier";

@injectable()
class AuthService {
  constructor(
    private readonly _unitOfWork: UnitOfWork,
    private readonly _hash: Hash,
    private readonly _jwt: Jwt,
    private readonly _timeConverter: TimeConverter,
    private readonly _securePasswordGenerator: SecurePasswordGenerator,
    private readonly _oauthStrategy: OAuthStrategy,
    private readonly _validationTokenVerifier: ValidationTokenVerifier,
  ) {}

  async emailSignIn(credentials: EmailSignInInput) {
    const userWithEmail = await this._unitOfWork.user.findOneByEmail(credentials.email);
    if (!userWithEmail) throw new InvalidCredentialsException("Invalid email or password");

    if (!userWithEmail.is_email_verified) throw new Error("Account's email is not verified.");

    const isValidPassword = await this._hash.verifySlowHash(
      credentials.password,
      userWithEmail.password,
    );

    if (!isValidPassword) throw new InvalidCredentialsException("Invalid email or password");

    const accessToken = this._jwt.signJwt(
      { id: userWithEmail.id, email: userWithEmail.email },
      "ACCESS_TOKEN_SECRET",
      this._timeConverter.toSeconds(5, "minute"),
    );

    const refreshTokenExpireInMs = this._timeConverter.toMs(14, "day");

    const refreshToken = this._jwt.signJwt(
      { id: userWithEmail.id },
      "REFRESH_TOKEN_SECRET",
      this._timeConverter.toSeconds(refreshTokenExpireInMs, "milisecond"),
    );

    await this._unitOfWork.session.create({
      session: this._hash.fastHash(refreshToken),
      expires_at: Date.now() + refreshTokenExpireInMs,
      user: userWithEmail,
    });

    return {
      id: userWithEmail.id,
      email: userWithEmail.email,
      accessToken,
      refreshToken,
      refreshTokenExpireInMs,
      auth_provider: userWithEmail.auth_provider,
    };
  }

  async oauthSignIn(code: string, type: OAuthProvidersType) {
    const { email } = await this._oauthStrategy[type](code);

    const userWithEmail = await this._unitOfWork.user.findOneByEmail(email);

    let createdUser: User | null = null;

    if (!userWithEmail) {
      const newPassword = this._securePasswordGenerator.generate();

      const hashedPassword = await this._hash.slowHash(newPassword);

      createdUser = await this._unitOfWork.user.create({
        email,
        password: hashedPassword,
        auth_provider: type,
        is_email_verified: true,
      });
    }

    const user = userWithEmail !== null ? userWithEmail : createdUser!;

    const refreshTokenExpireInMs = this._timeConverter.toMs(14, "day");

    const refreshToken = this._jwt.signJwt(
      { id: user.id },
      "REFRESH_TOKEN_SECRET",
      this._timeConverter.toSeconds(refreshTokenExpireInMs, "milisecond"),
    );

    await this._unitOfWork.session.create({
      session: this._hash.fastHash(refreshToken),
      expires_at: Date.now() + refreshTokenExpireInMs,
      user,
    });

    return {
      refreshToken,
      refreshTokenExpireInMs,
    };
  }

  async verifyEmail(token: string) {
    const { tokenPayload, hashedToken } = await this._validationTokenVerifier.verify<{
      id: string;
    }>(token, "EMAIL_VERIFICATION_TOKEN_SECRET");

    const user = await this._unitOfWork.user.findOneById(tokenPayload.id);

    if (!user) throw new Error("User does not exist");

    if (user.is_email_verified) throw new Error("User already verified");

    await this._unitOfWork.user.update({
      id: user.id,
      modified_at: Date.now(),
      is_email_verified: true,
    });

    await this._unitOfWork.verificationToken.deleteByToken(hashedToken);

    return true;
  }

  async logout(refreshToken: string) {
    let refreshTokenPayload = { id: "" };

    try {
      refreshTokenPayload = {
        ...this._jwt.verifyJwt<{ id: string }>(refreshToken, "REFRESH_TOKEN_SECRET"),
      };
    } catch (error) {
      throw new Error("You must be logged in");
    }

    await this._unitOfWork.session.deleteBySession(
      refreshTokenPayload.id,
      this._hash.fastHash(refreshToken),
    );

    await this._unitOfWork.session.deleteAllExpiredSessions(refreshTokenPayload.id, Date.now());

    return true;
  }
}

export default AuthService;
