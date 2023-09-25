import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import {
  EmailSignInInput,
  OAuthSignInput,
  emailSignInSchema,
  oauthSignInSchema,
} from "./auth.schema";
import AuthService from "./auth.service";
import { HttpResponse } from "../../utils/httpResponse";
import { validateResource } from "../../middleware/validateResource";
import requireAuth from "../../middleware/requireAuth";
import { CustomRequest } from "../../server";
import { highRateLimit } from "../../middleware/rateLimiting";
import { config } from "../../config";
import setRefreshTokenCookie from "../../utils/setRefreshTokenCookie";

@controller("/auth")
class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @httpPost("/email-sign-in", highRateLimit, validateResource(emailSignInSchema))
  async emailSignIn(req: Request<object, object, EmailSignInInput>, res: Response) {
    const { id, email, accessToken, refreshToken, refreshTokenExpireInMs, auth_provider } =
      await this._authService.emailSignIn(req.body);

    setRefreshTokenCookie(res, refreshToken, refreshTokenExpireInMs);

    return HttpResponse.success(res, {
      id,
      email,
      accessToken,
      auth_provider,
    });
  }

  @httpGet("/google-sign-in", validateResource(oauthSignInSchema))
  async googleSignIn(req: CustomRequest<object, object, OAuthSignInput>, res: Response) {
    const { refreshToken, refreshTokenExpireInMs } = await this._authService.oauthSignIn(
      req.body.code,
      "google",
    );

    setRefreshTokenCookie(res, refreshToken, refreshTokenExpireInMs);

    return res.redirect(config.CLIENT_BASE_URL);
  }

  @httpGet("/discord-sign-in", validateResource(oauthSignInSchema))
  async discordSignIn(req: CustomRequest<object, object, OAuthSignInput>, res: Response) {
    const { refreshToken, refreshTokenExpireInMs } = await this._authService.oauthSignIn(
      req.body.code,
      "discord",
    );

    setRefreshTokenCookie(res, refreshToken, refreshTokenExpireInMs);

    return res.redirect(config.CLIENT_BASE_URL);
  }

  @httpGet("/linkedin-sign-in", validateResource(oauthSignInSchema))
  async linkedinSignIn(req: CustomRequest<object, object, OAuthSignInput>, res: Response) {
    const { refreshToken, refreshTokenExpireInMs } = await this._authService.oauthSignIn(
      req.body.code,
      "linkedin",
    );

    setRefreshTokenCookie(res, refreshToken, refreshTokenExpireInMs);

    return res.redirect(config.CLIENT_BASE_URL);
  }

  @httpGet("/github-sign-in", validateResource(oauthSignInSchema))
  async githubSignIn(req: CustomRequest<object, object, OAuthSignInput>, res: Response) {
    const { refreshToken, refreshTokenExpireInMs } = await this._authService.oauthSignIn(
      req.body.code,
      "github",
    );

    setRefreshTokenCookie(res, refreshToken, refreshTokenExpireInMs);

    return res.redirect(config.CLIENT_BASE_URL);
  }

  @httpPost("/logout", requireAuth)
  async logout(req: CustomRequest, res: Response) {
    const refreshToken = req.cookies["refresh_token"];

    await this._authService.logout(refreshToken);

    setRefreshTokenCookie(res, "", 0);

    return HttpResponse.success(res);
  }
}

export default AuthController;
