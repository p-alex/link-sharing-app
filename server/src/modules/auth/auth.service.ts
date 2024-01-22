import { injectable } from "inversify";
import UnitOfWork from "../../unitOfWork";
import Cryptography from "../../utils/cryptography";
import Jwt from "../../utils/jwt";
import { EmailSignInInput } from "./auth.schema";
import InvalidCredentialsException from "../../exceptions/InvalidCredentialsException";
import SecurePasswordGenerator from "../../utils/securePasswordGenerator";
import User from "../user/user.entity";
import OAuthStrategy from "./oauth.strategy";
import ValidationTokenVerifier from "../../utils/verificationTokenVerifier";
import { OAuthProvidersType } from "../identity/identity.entity";
import { IClientAuth } from "./auth.interfaces";
import RandomIdentifier from "../../utils/randomIdentifier";

@injectable()
class AuthService {
  constructor(
    private readonly _unitOfWork: UnitOfWork,
    private readonly _cryptography: Cryptography,
    private readonly _jwt: Jwt,
    private readonly _securePasswordGenerator: SecurePasswordGenerator,
    private readonly _oauthStrategy: OAuthStrategy,
    private readonly _validationTokenVerifier: ValidationTokenVerifier,
    private readonly _randomIdentifier: RandomIdentifier,
  ) {}

  async emailSignIn(credentials: EmailSignInInput): Promise<IClientAuth> {
    const userWithEmail = await this._unitOfWork.user.findOneByEmail(credentials.email);
    if (!userWithEmail) throw new InvalidCredentialsException("Invalid email or password");

    if (!userWithEmail.is_email_verified) throw new Error("Account's email is not verified.");

    const isValidPassword = await this._cryptography.verifySlowHash(
      credentials.password,
      userWithEmail.password,
    );

    if (!isValidPassword) throw new InvalidCredentialsException("Invalid email or password");

    const sessionId = this._randomIdentifier.createUUID();

    const accessToken = this._jwt.signAccessToken({
      id: userWithEmail.id,
      sessionId,
    });

    const encryptedAccessToken = this._cryptography.cipher(accessToken, "ACCESS_TOKEN_CIPHER_KEY");

    const { refreshToken, refreshTokenExpireInMs } = this._jwt.signRefreshToken({
      id: userWithEmail.id,
    });

    const encryptedRefreshToken = this._cryptography.cipher(
      refreshToken,
      "REFRESH_TOKEN_CIPHER_KEY",
    );

    const session = await this._unitOfWork.session.create({
      id: sessionId,
      session: this._cryptography.fastHash(refreshToken),
      expires_at: new Date(Date.now() + refreshTokenExpireInMs),
      user: userWithEmail,
    });

    return {
      clientAuthData: {
        id: userWithEmail.id,
        email: userWithEmail.email,
        accessToken: encryptedAccessToken,
        sessionId: session.id,
      },
      refreshToken: encryptedRefreshToken,
      refreshTokenExpireInMs,
    };
  }

  async oauthSignIn(code: string, provider: OAuthProvidersType) {
    const { email } = await this._oauthStrategy[provider](code);

    if (!email) {
      return {
        success: false,
        message:
          "There was an error while trying to retrieve the email address from " +
          provider +
          ". Please try again later.",
        refreshToken: null,
        refreshTokenExpireInMs: 0,
      };
    }

    const userWithEmail = await this._unitOfWork.user.findOneByEmail(email);

    let createdUser: User | null = null;

    if (!userWithEmail) {
      const newPassword = this._securePasswordGenerator.generate();

      const hashedPassword = await this._cryptography.slowHash(newPassword);

      createdUser = await this._unitOfWork.user.create({
        email,
        password: hashedPassword,
        is_email_verified: true,
      });

      await this._unitOfWork.identity.create({
        provider,
        user: createdUser,
      });
    }

    const user = userWithEmail !== null ? userWithEmail : createdUser!;

    const hasProviderIdentity = await this._unitOfWork.identity.findOneByUserIdAndProvider(
      user.id,
      provider,
    );

    if (hasProviderIdentity === null) {
      return {
        success: false,
        message: "Account does not exist",
        refreshToken: null,
        refreshTokenExpireInMs: null,
      };
    }

    const { refreshToken, refreshTokenExpireInMs } = this._jwt.signRefreshToken({ id: user.id });

    const encryptedRefreshToken = this._cryptography.cipher(
      refreshToken,
      "REFRESH_TOKEN_CIPHER_KEY",
    );

    await this._unitOfWork.session.create({
      session: this._cryptography.fastHash(refreshToken),
      expires_at: new Date(Date.now() + refreshTokenExpireInMs),
      user,
    });

    return {
      success: true,
      message: "success",
      refreshToken: encryptedRefreshToken,
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
      is_email_verified: true,
    });

    await this._unitOfWork.verificationToken.deleteByToken(hashedToken);

    return true;
  }

  async logout(encryptedRefreshToken: string) {
    const decryptedRefreshToken = this._cryptography.decipher(
      encryptedRefreshToken,
      "REFRESH_TOKEN_CIPHER_KEY",
    );

    let refreshTokenPayload: { id: string };

    try {
      refreshTokenPayload = {
        ...this._jwt.verifyJwt<{ id: string }>(decryptedRefreshToken, "REFRESH_TOKEN_SECRET"),
      };
    } catch (error) {
      throw new Error("You must be logged in");
    }

    await this._unitOfWork.session.deleteBySession(
      refreshTokenPayload.id,
      this._cryptography.fastHash(decryptedRefreshToken),
    );

    await this._unitOfWork.session.deleteAllExpiredSessions(
      refreshTokenPayload.id,
      new Date(Date.now()),
    );

    return true;
  }
}

export default AuthService;
