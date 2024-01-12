import { Response } from "express";
import { controller, httpPost } from "inversify-express-utils";
import { HttpResponse } from "../../utils/httpResponse";
import { CustomRequest } from "../../server";
import SessionService from "./session.service";
import { lowRateLimit } from "../../middleware/rateLimiting";
import setRefreshTokenCookie, {
  REFRESH_TOKEN_COOKIE_NAME,
} from "../../utils/setRefreshTokenCookie";

@controller("/sessions")
class SessionController {
  constructor(private readonly _sessionService: SessionService) {}

  @httpPost("/refresh", lowRateLimit)
  async refreshSession(req: CustomRequest, res: Response) {
    const currentRefreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];

    if (!currentRefreshToken) return HttpResponse.error(res, 403, ["You have to be logged in!"]);

    const { id, email, sessionId, accessToken, refreshToken, refreshTokenExpireInMs } =
      await this._sessionService.refreshSession(currentRefreshToken);

    setRefreshTokenCookie(res, refreshToken, refreshTokenExpireInMs);

    return HttpResponse.success(res, {
      id,
      email,
      sessionId,
      accessToken,
    });
  }
}

export default SessionController;
