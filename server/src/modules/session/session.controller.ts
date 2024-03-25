import { Response } from "express";
import { controller, httpDelete, httpPost } from "inversify-express-utils";
import { HttpResponse } from "../../utils/httpResponse";
import { CustomRequest } from "../../server";
import SessionService from "./session.service";
import { lowRateLimit } from "../../middleware/rateLimiting";
import setRefreshTokenCookie, {
  REFRESH_TOKEN_COOKIE_NAME,
} from "../../utils/setRefreshTokenCookie";
import requireAuth from "../../middleware/requireAuth";
import { validateResource } from "../../middleware/validateResource";
import { DeleteAllOtherSessionsInput, deleteAllOtherSessionsSchema } from "./session.schemas";

@controller("/sessions")
class SessionController {
  constructor(private readonly _sessionService: SessionService) {}

  @httpPost("/refresh", lowRateLimit)
  async refreshSession(req: CustomRequest, res: Response) {
    const currentRefreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];

    if (!currentRefreshToken) return HttpResponse.error(res, 403, ["You have to be logged in!"]);

    const { authData, profileData, refreshToken, refreshTokenExpireInMs } =
      await this._sessionService.refreshSession(currentRefreshToken);

    setRefreshTokenCookie(res, refreshToken, refreshTokenExpireInMs);

    return HttpResponse.success(res, { authData, profileData });
  }

  @httpDelete(
    "/delete-all-other-sessions",
    lowRateLimit,
    requireAuth,
    validateResource(deleteAllOtherSessionsSchema),
  )
  async deleteAllOtherSessions(
    req: CustomRequest<object, object, DeleteAllOtherSessionsInput>,
    res: Response,
  ) {
    const { securityToken } = req.body;
    const user = req.user;
    await this._sessionService.deleteAllOtherSessions(user.id, user.sessionId, securityToken);
    return HttpResponse.success(res);
  }
}

export default SessionController;
