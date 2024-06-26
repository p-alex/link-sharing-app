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

  async refreshSession(refreshToken: string): Promise<IClientAuth> {
    let userIdFromRefreshToken = "";

    try {
      userIdFromRefreshToken = this._jwt.verifyJwt<{ id: string }>(
        refreshToken,
        "REFRESH_TOKEN_SECRET",
      ).id;
    } catch (_) {
      throw new Error("Your session expired. Please log in again.");
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

    const profileData = await this._unitOfWork.profile.findOneByUserId(user.id);

    if (!profileData) throw new Error("This user has no profile created");

    return {
      authData: {
        id: user.id,
        email: user.email,
        accessToken: newAccessToken,
        sessionId: session.id,
      },
      profileData,
      refreshToken: newRefreshToken,
      refreshTokenExpireInMs: session.expires_at.getTime() - Date.now(),
    };
  }
}

export default SessionService;
