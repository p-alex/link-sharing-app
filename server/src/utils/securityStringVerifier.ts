import { injectable } from "inversify";
import { config } from "../config";
import UnitOfWork from "../unitOfWork";
import Cryptography from "./cryptography";
import Jwt from "./jwt";

@injectable()
class SecurityStringVerifier {
  constructor(
    private readonly _unitOfWork: UnitOfWork,
    private readonly _cryptography: Cryptography,
    private readonly _jwt: Jwt,
  ) {}

  async verifyToken<TPayload>(
    token: string,
    secret: keyof typeof config.jwtSecrets,
  ): Promise<{ tokenPayload: TPayload; hashedToken: string }> {
    const hashedToken = this._cryptography.fastHash(token);

    const isToken = await this._unitOfWork.securityToken.findOneByToken(hashedToken);

    if (!isToken) throw new Error("Invalid token");

    let tokenPayload: TPayload;

    try {
      tokenPayload = this._jwt.verifyJwt<TPayload>(token, secret);
    } catch (error) {
      await this._unitOfWork.securityToken.deleteByToken(this._cryptography.fastHash(token));
      throw new Error("Token expired");
    }

    await this._unitOfWork.securityToken.deleteByToken(this._cryptography.fastHash(token));

    return { tokenPayload, hashedToken };
  }
}

export default SecurityStringVerifier;
