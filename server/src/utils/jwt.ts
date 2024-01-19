import { config } from "../config";
import { injectable } from "inversify";
import jwt from "jsonwebtoken";
import { TimeConverter } from "./timeConverter";

export interface IAccessTokenPayload {
  id: string;
  email: string;
  sessionId: string;
}

@injectable()
class Jwt {
  constructor(private readonly _timeConverter: TimeConverter) {}
  signAccessToken(data: IAccessTokenPayload) {
    return this.signJwt(data, "ACCESS_TOKEN_SECRET", this._timeConverter.toSeconds(5, "minute"));
  }
  signRefreshToken(data: { id: string }) {
    const expiryInSeconds = this._timeConverter.toSeconds(14, "day");
    const refreshToken = this.signJwt(data, "REFRESH_TOKEN_SECRET", expiryInSeconds);
    return {
      refreshToken,
      refreshTokenExpireInMs: this._timeConverter.toMs(expiryInSeconds, "second"),
    };
  }
  signJwt<TData extends object>(
    payload: TData,
    secret: keyof typeof config.jwtSecrets,
    expiryInSeconds: number,
  ) {
    return jwt.sign({ ...payload }, secret, { expiresIn: expiryInSeconds, algorithm: "HS512" });
  }
  verifyJwt<TPayload>(token: string, secret: keyof typeof config.jwtSecrets) {
    return jwt.verify(token, secret, { algorithms: ["HS512"] }) as TPayload;
  }
}

export default Jwt;
