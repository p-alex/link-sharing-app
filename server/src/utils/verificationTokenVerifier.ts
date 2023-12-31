import { injectable } from "inversify";
import UnitOfWork from "../unitOfWork";
import Hash from "./hash";
import Jwt from "./jwt";
import { config } from "../config";

@injectable()
class VerificationTokenVerifier {
  constructor(
    private readonly _unitOfWork: UnitOfWork,
    private readonly _hash: Hash,
    private readonly _jwt: Jwt,
  ) {}
  async verify<TPayload>(
    token: string,
    secret: keyof typeof config.jwtSecrets,
  ): Promise<{ tokenPayload: TPayload; hashedToken: string }> {
    const hashedToken = this._hash.fastHash(token);

    const isToken = await this._unitOfWork.verificationToken.findOneByToken(hashedToken);

    if (!isToken) throw new Error("Invalid token");

    let tokenPayload: TPayload;

    try {
      tokenPayload = this._jwt.verifyJwt<TPayload>(token, secret);
    } catch (error) {
      throw new Error("Token expired");
    }

    return { tokenPayload, hashedToken };
  }
}

export default VerificationTokenVerifier;
