import { injectable } from "inversify";
import EmailApi, {
  IEmailApiSecurityCodeEmailArgs,
  IEmailApiSendEmailResponse,
  IEmailApiVerificationEmailArgs,
} from "./EmailApi";
import NodemailerEmailApi from "./NodemailerEmailApi";

@injectable()
class EmailSender extends EmailApi {
  constructor(private readonly _emailApi: NodemailerEmailApi) {
    super();
  }

  async sendAccountVerificationEmail(
    args: IEmailApiVerificationEmailArgs,
  ): Promise<IEmailApiSendEmailResponse> {
    return this._emailApi!.sendAccountVerificationEmail(args);
  }

  async sendResetPasswordVerificationEmail(
    args: IEmailApiVerificationEmailArgs,
  ): Promise<IEmailApiSendEmailResponse> {
    return this._emailApi!.sendResetPasswordVerificationEmail(args);
  }

  async sendSecurityCodeEmail(
    args: IEmailApiSecurityCodeEmailArgs,
  ): Promise<IEmailApiSendEmailResponse> {
    return await this._emailApi!.sendSecurityCodeEmail(args);
  }
}

export default EmailSender;
