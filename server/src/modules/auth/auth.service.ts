import { injectable } from "inversify";
import UnitOfWork from "../../unitOfWork";
import Hash from "../../utils/hash";
import Jwt from "../../utils/jwt";
import { EmailSignInInput } from "./auth.schema";
import { TimeConverter } from "../../utils/timeConverter";
import InvalidCredentialsException from "../../exceptions/InvalidCredentialsException";
import SecurePasswordGenerator from "../../utils/securePasswordGenerator";
import User, { AuthProvidersType } from "../user/user.entity";
import OAuthStrategy from "../oauthStrategy";

@injectable()
class AuthService {
  constructor(
    private readonly _unitOfWork: UnitOfWork,
    private readonly _hash: Hash,
    private readonly _jwt: Jwt,
    private readonly _timeConverter: TimeConverter,
    private readonly _securePasswordGenerator: SecurePasswordGenerator,
    private readonly _oauthStrategy: OAuthStrategy,
  ) {}

  async emailSignIn(credentials: EmailSignInInput) {
    const userWithEmail = await this._unitOfWork.user.findByEmail(credentials.email);
    if (!userWithEmail) throw new InvalidCredentialsException("Invalid email or password");

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

  async oauthSignIn(code: string, type: AuthProvidersType) {
    const { email } = await this._oauthStrategy[type](code);

    const userWithEmail = await this._unitOfWork.user.findByEmail(email);

    let createdUser: User | null = null;

    if (!userWithEmail) {
      const newPassword = this._securePasswordGenerator.generate();
      const hashedPassword = await this._hash.slowHash(newPassword);
      createdUser = await this._unitOfWork.user.create({
        email,
        password: hashedPassword,
        auth_provider: type,
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
