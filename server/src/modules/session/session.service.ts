import { injectable } from "inversify";
import Jwt from "../../utils/jwt";
import Cryptography from "../../utils/cryptography";
import UnitOfWork from "../../unitOfWork";
import { IClientAuth } from "../auth/auth.interfaces";

@injectable()
class SessionService {
  constructor(
    private readonly _unitOfWork: UnitOfWork,
    private readonly _jwt: Jwt,
    private readonly _cryptography: Cryptography,
  ) {}

  async refreshSession(encryptedRefreshToken: string): Promise<IClientAuth> {
    const decryptedRefreshToken = this._cryptography.decipher(
      encryptedRefreshToken,
      "REFRESH_TOKEN_CIPHER_KEY",
    );
    let userIdFromRefreshToken = "";

    try {
      userIdFromRefreshToken = this._jwt.verifyJwt<{ id: string }>(
        decryptedRefreshToken,
        "REFRESH_TOKEN_SECRET",
      ).id;
    } catch (_) {
      throw new Error("Refresh token expired");
    }

    const user = await this._unitOfWork.user.findOneById(userIdFromRefreshToken);

    if (!user) throw new Error("User does not exist anymore");

    const session = await this._unitOfWork.session.findBySession(
      this._cryptography.fastHash(decryptedRefreshToken),
    );
    if (!session) throw new Error("Session doesn't exist");

    const newAccessToken = this._jwt.signAccessToken({
      id: user.id,
      email: user.email,
      sessionId: session.id,
    });

    const newEncryptedAccessToken = this._cryptography.cipher(
      newAccessToken,
      "ACCESS_TOKEN_CIPHER_KEY",
    );

    const { refreshToken: newRefreshToken } = this._jwt.signRefreshToken({ id: user.id });

    const newHashedRefreshToken = this._cryptography.fastHash(newRefreshToken);

    const newEncryptedRefreshToken = this._cryptography.cipher(
      newRefreshToken,
      "REFRESH_TOKEN_CIPHER_KEY",
    );

    const newSession = { ...session, session: newHashedRefreshToken };

    await this._unitOfWork.session.update(newSession);

    return {
      clientAuthData: {
        id: user.id,
        email: user.email,
        accessToken: newEncryptedAccessToken,
        sessionId: session.id,
      },
      refreshToken: newEncryptedRefreshToken,
      refreshTokenExpireInMs: session.expires_at.getTime() - Date.now(),
    };
  }

  async deleteAllOtherSessions(userId: string, currentSessionId: string) {
    await this._unitOfWork.session.deleteAllOtherSessions(userId, currentSessionId);
    return true;
  }
}

export default SessionService;
