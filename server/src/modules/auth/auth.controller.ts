import { Request, Response } from "express";
import { controller, httpGet, httpPost } from "inversify-express-utils";
import {
  EmailSignInInput,
  OAuthSignInput,
  VerifyEmailInput,
  emailSignInSchema,
  oauthSignInSchema,
  verifyEmailSchema,
} from "./auth.schema";
import AuthService from "./auth.service";
import { HttpResponse } from "../../utils/httpResponse";
import { validateResource } from "../../middleware/validateResource";
import requireAuth from "../../middleware/requireAuth";
import { CustomRequest } from "../../server";
import { highRateLimit, veryHighRateLimit } from "../../middleware/rateLimiting";
import { config } from "../../config";
import setRefreshTokenCookie, {
  REFRESH_TOKEN_COOKIE_NAME,
} from "../../utils/setRefreshTokenCookie";
import { validateCaptcha } from "../../middleware/validateCaptcha";

@controller("/auth")
class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @httpPost("/email-sign-in", highRateLimit, validateResource(emailSignInSchema), validateCaptcha)
  async emailSignIn(req: Request<object, object, EmailSignInInput>, res: Response) {
    const { clientAuthData, refreshToken, refreshTokenExpireInMs } =
      await this._authService.emailSignIn(req.body);

    setRefreshTokenCookie(res, refreshToken, refreshTokenExpireInMs);

    return HttpResponse.success(res, clientAuthData);
  }

  @httpGet("/google-sign-in", validateResource(oauthSignInSchema))
  async googleSignIn(req: CustomRequest<object, object, OAuthSignInput>, res: Response) {
    const { success, message, refreshToken, refreshTokenExpireInMs } =
      await this._authService.oauthSignIn(req.body.code, "google");

    if (!success) return res.redirect(config.CLIENT_BASE_URL + `/sign-in?error=${message}`);

    setRefreshTokenCookie(res, refreshToken!, refreshTokenExpireInMs!);

    return res.redirect(config.CLIENT_BASE_URL + "/links");
  }

  @httpGet("/discord-sign-in", validateResource(oauthSignInSchema))
  async discordSignIn(req: CustomRequest<object, object, OAuthSignInput>, res: Response) {
    const { success, message, refreshToken, refreshTokenExpireInMs } =
      await this._authService.oauthSignIn(req.body.code, "discord");

    if (!success) return res.redirect(config.CLIENT_BASE_URL + `/sign-in?error=${message}`);

    setRefreshTokenCookie(res, refreshToken!, refreshTokenExpireInMs!);

    return res.redirect(config.CLIENT_BASE_URL + "/links");
  }

  @httpGet("/linkedin-sign-in", validateResource(oauthSignInSchema))
  async linkedinSignIn(req: CustomRequest<object, object, OAuthSignInput>, res: Response) {
    const { success, message, refreshToken, refreshTokenExpireInMs } =
      await this._authService.oauthSignIn(req.body.code, "linkedin");

    if (!success) return res.redirect(config.CLIENT_BASE_URL + `/sign-in?error=${message}`);

    setRefreshTokenCookie(res, refreshToken!, refreshTokenExpireInMs!);

    return res.redirect(config.CLIENT_BASE_URL + "/links");
  }

  @httpGet("/github-sign-in", validateResource(oauthSignInSchema))
  async githubSignIn(req: CustomRequest<object, object, OAuthSignInput>, res: Response) {
    const { success, message, refreshToken, refreshTokenExpireInMs } =
      await this._authService.oauthSignIn(req.body.code, "github");

    if (!success) return res.redirect(config.CLIENT_BASE_URL + `/sign-in?error=${message}`);

    setRefreshTokenCookie(res, refreshToken!, refreshTokenExpireInMs!);

    return res.redirect(config.CLIENT_BASE_URL + "/links");
  }

  @httpPost("/verify-email/:token", veryHighRateLimit, validateResource(verifyEmailSchema))
  async verifyEmail(req: CustomRequest<object, object, VerifyEmailInput>, res: Response) {
    await this._authService.verifyEmail(req.body.token);
    return HttpResponse.success(res);
  }

  @httpPost("/logout", requireAuth)
  async logout(req: CustomRequest, res: Response) {
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];

    await this._authService.logout(refreshToken);

    setRefreshTokenCookie(res, "", 0);

    return HttpResponse.success(res);
  }
}

export default AuthController;
