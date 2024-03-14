import { injectable } from "inversify";

export interface IEmailTemplate {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
}

interface IEmailApiArgs {
  to: string;
}

export interface IEmailApiVerificationEmailArgs extends IEmailApiArgs {
  verificationToken: string;
}

export interface IEmailApiSecurityCodeEmailArgs extends IEmailApiArgs {
  code: string;
}

export type IEmailApiSendEmailResponse = {
  success: boolean;
};

@injectable()
abstract class EmailApi {
  abstract sendAccountVerificationEmail(
    args: IEmailApiVerificationEmailArgs,
  ): Promise<IEmailApiSendEmailResponse>;

  abstract sendResetPasswordVerificationEmail(
    args: IEmailApiVerificationEmailArgs,
  ): Promise<IEmailApiSendEmailResponse>;

  abstract sendSecurityCodeEmail(
    args: IEmailApiSecurityCodeEmailArgs,
  ): Promise<IEmailApiSendEmailResponse>;
}

export default EmailApi;
