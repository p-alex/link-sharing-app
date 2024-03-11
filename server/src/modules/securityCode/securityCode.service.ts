import { injectable } from "inversify";
import UnitOfWork from "../../unitOfWork";
import CodeGenerator from "../../utils/codeGenerator";
import emailSender from "../../utils/mailer";
import SecurityCode from "./securityCode.entity";
import { TimeConverter } from "../../utils/timeConverter";
import Jwt from "../../utils/jwt";
import Cryptography from "../../utils/cryptography";
import SecurityStringVerifier from "../../utils/securityStringVerifier";

@injectable()
class SecurityCodeService {
  constructor(
    private readonly _unitOfWork: UnitOfWork,
    private readonly _codeGenerator: CodeGenerator,
    private readonly _timeConverter: TimeConverter,
    private readonly _jwt: Jwt,
    private readonly _cryptography: Cryptography,
    private readonly _securityStringVerifier: SecurityStringVerifier,
  ) {}

  async sendCode(userId: string) {
    const user = await this._unitOfWork.user.findOneById(userId);

    if (!user) throw new Error("User does not exist");

    const code = this._codeGenerator.generate();

    const expirationDate = new Date(Date.now() + this._timeConverter.toMs(1, "day"));

    const newSecurityCode = new SecurityCode(user.id, user, code, expirationDate);

    await this._unitOfWork.securityCode.create(newSecurityCode);

    await emailSender.sendSecurityCodeEmail({ to: user.email, code });

    return true;
  }

  async verify(userId: string, code: string) {
    const { securityCode } = await this._securityStringVerifier.verifyCode(userId, code);

    const securityToken = this._jwt.signJwt(
      { code: securityCode.code },
      "SECURITY_CODE_VERIFICATION_TOKEN_SECRET",
      new Date(securityCode.expires_at).getSeconds(),
    );

    await this._unitOfWork.securityToken.create({
      userId,
      user: securityCode.user,
      token: this._cryptography.fastHash(securityToken),
      expires_at: securityCode.expires_at,
    });

    return { securityToken };
  }
}

export default SecurityCodeService;
