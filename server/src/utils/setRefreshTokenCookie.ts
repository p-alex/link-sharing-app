import { Response } from "express";

const setRefreshTokenCookie = (res: Response, token: string, maxAgeInMs: number) => {
  res.cookie("refresh_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: maxAgeInMs,
  });
};

export default setRefreshTokenCookie;
