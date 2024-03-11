import { injectable } from "inversify";
import Jwt from "../../utils/jwt";
import Cryptography from "../../utils/cryptography";
import UnitOfWork from "../../unitOfWork";
import { IClientAuth } from "../auth/auth.interfaces";
import SecurityStringVerifier from "../../utils/securityStringVerifier";

@injectable()
class SessionService {
  constructor(
    private readonly _unitOfWork: UnitOfWork,
    private readonly _jwt: Jwt,
    private readonly _cryptography: Cryptography,
    private readonly _securityStringVerifier: SecurityStringVerifier,
  ) {}

  async refreshSession(refreshToken: string): Promise<IClientAuth> {
    let userIdFromRefreshToken = "";

    try {
      userIdFromRefreshToken = this._jwt.verifyJwt<{ id: string }>(
        refreshToken,
        "REFRESH_TOKEN_SECRET",
      ).id;
    } catch (_) {
      throw new Error("Refresh token expired");
    }

    const user = await this._unitOfWork.user.findOneById(userIdFromRefreshToken);

    if (!user) throw new Error("User does not exist anymore");

    const session = await this._unitOfWork.session.findBySession(
      this._cryptography.fastHash(refreshToken),
    );

    if (!session) throw new Error("Session doesn't exist");

    const newAccessToken = this._jwt.signAccessToken({
      id: user.id,
      sessionId: session.id,
    });

    const { refreshToken: newRefreshToken } = this._jwt.signRefreshToken({ id: user.id });

    const newHashedRefreshToken = this._cryptography.fastHash(newRefreshToken);

    const newSession = { ...session, session: newHashedRefreshToken };

    await this._unitOfWork.session.update(newSession);

    return {
      clientAuthData: {
        id: user.id,
        email: user.email,
        accessToken: newAccessToken,
        sessionId: session.id,
      },
      refreshToken: newRefreshToken,
      refreshTokenExpireInMs: session.expires_at.getTime() - Date.now(),
    };
  }

  async deleteAllOtherSessions(userId: string, currentSessionId: string, securityToken: string) {
    await this._securityStringVerifier.verifyToken<{
      securityCode: string;
    }>(securityToken, "SECURITY_CODE_VERIFICATION_TOKEN_SECRET");

    await this._unitOfWork.session.deleteAllOtherSessions(userId, currentSessionId);

    return true;
  }
}

export default SessionService;
