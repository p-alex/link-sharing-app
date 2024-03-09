import { IEmailApiSendEmailResponse, IEmailApiVerificationEmailArgs } from "./SendGridEmailApi";

abstract class EmailApi {
  abstract sendAccountVerificationEmail(
    args: IEmailApiVerificationEmailArgs,
  ): Promise<IEmailApiSendEmailResponse>;

  abstract sendResetPasswordVerificationEmail(
    args: IEmailApiVerificationEmailArgs,
  ): Promise<IEmailApiSendEmailResponse>;
}

export default EmailApi;
