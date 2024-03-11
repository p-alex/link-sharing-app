import { controller, httpPost } from "inversify-express-utils";
import SecurityCodeService from "./securityCode.service";
import { CustomRequest } from "../../server";
import { lowRateLimit, veryHighRateLimit } from "../../middleware/rateLimiting";
import requireAuth from "../../middleware/requireAuth";
import { validateResource } from "../../middleware/validateResource";
import {
  SendSecurityCodeInput,
  VerifitySecurityCodeInput,
  sendSecurityCodeSchema,
  verifySecurityCodeSchema,
} from "./securityCode.schemas";
import { HttpResponse } from "../../utils/httpResponse";
import { Response } from "express";
import { validateCaptcha } from "../../middleware/validateCaptcha";

@controller("/security-code")
class SecurityCodeController {
  constructor(private readonly _securityCodeSerivce: SecurityCodeService) {}

  @httpPost(
    "/send",
    veryHighRateLimit,
    requireAuth,
    validateResource(sendSecurityCodeSchema),
    validateCaptcha,
  )
  async sendCode(req: CustomRequest<object, object, SendSecurityCodeInput>, res: Response) {
    const { id } = req.user;
    await this._securityCodeSerivce.sendCode(id);
    return HttpResponse.success(res);
  }

  @httpPost("/verify", lowRateLimit, requireAuth, validateResource(verifySecurityCodeSchema))
  async verify(req: CustomRequest<object, object, VerifitySecurityCodeInput>, res: Response) {
    const { id } = req.user;
    const { securityCode } = req.body;
    const { securityToken } = await this._securityCodeSerivce.verify(id, securityCode);
    return HttpResponse.success(res, { securityToken });
  }
}

export default SecurityCodeController;
