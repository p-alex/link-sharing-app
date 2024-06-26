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
  token: string;
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
}

export default EmailApi;
