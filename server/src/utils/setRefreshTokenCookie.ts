import { Response } from "express";

export const REFRESH_TOKEN_COOKIE_NAME = "session";

const setRefreshTokenCookie = (res: Response, token: string, maxAgeInMs: number) => {
  res.cookie(REFRESH_TOKEN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: maxAgeInMs,
  });
};

export default setRefreshTokenCookie;
