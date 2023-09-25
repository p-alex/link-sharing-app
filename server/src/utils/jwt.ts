import { config } from "../config";
import { injectable } from "inversify";
import jwt from "jsonwebtoken";

@injectable()
class Jwt {
  signJwt<TData extends object>(
    payload: TData,
    secret: keyof typeof config.jwtSecrets,
    expiresIn: number,
  ) {
    return jwt.sign({ ...payload }, secret, { expiresIn, algorithm: "HS512" });
  }
  verifyJwt<TPayload>(token: string, secret: keyof typeof config.jwtSecrets) {
    return jwt.verify(token, secret, { algorithms: ["HS512"] }) as TPayload;
  }
}

export default Jwt;
