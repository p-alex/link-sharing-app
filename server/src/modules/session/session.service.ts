import { injectable } from "inversify";
import Jwt from "../../utils/jwt";
import Hash from "../../utils/hash";
import UnitOfWork from "../../unitOfWork";
import { TimeConverter } from "../../utils/timeConverter";

@injectable()
class SessionService {
  constructor(
    private readonly _unitOfWork: UnitOfWork,
    private readonly _jwt: Jwt,
    private readonly _hash: Hash,
    private readonly _timeConverter: TimeConverter,
  ) {}

  async refreshSession(refreshToken: string) {
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

    const session = await this._unitOfWork.session.findBySession(this._hash.fastHash(refreshToken));
    if (!session) throw new Error("Session doesn't exist");

    const newAccessToken = this._jwt.signJwt(
      { id: user.id, email: user.email },
      "ACCESS_TOKEN_SECRET",
      this._timeConverter.toSeconds(5, "minute"),
    );

    const newRefreshToken = this._jwt.signJwt(
      { id: user.id },
      "REFRESH_TOKEN_SECRET",
      this._timeConverter.toSeconds(session.expires_at.getTime() - Date.now(), "milisecond"),
    );

    const newHashedRefreshToken = this._hash.fastHash(newRefreshToken);

    session.session = newHashedRefreshToken;

    await this._unitOfWork.session.update(session);

    return {
      id: user.id,
      email: user.email,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      refreshTokenExpireInMs: session.expires_at.getTime() - Date.now(),
    };
  }
}

export default SessionService;
