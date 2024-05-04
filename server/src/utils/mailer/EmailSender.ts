import { injectable } from "inversify";
import EmailApi, { IEmailApiSendEmailResponse, IEmailApiVerificationEmailArgs } from "./EmailApi";
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
}

export default EmailSender;
