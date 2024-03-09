import EmailApi from "./EmailApi";
import { IEmailApiSendEmailResponse, IEmailApiVerificationEmailArgs } from "./SendGridEmailApi";

class EmailSender extends EmailApi {
  private static emailSenderInstance: EmailSender;
  private emailApi: EmailApi | undefined;

  static getInstance() {
    if (!this.emailSenderInstance) {
      this.emailSenderInstance = new EmailSender();
    }
    return this.emailSenderInstance;
  }

  setEmailApi(emailApi: EmailApi) {
    this.emailApi = emailApi;
  }

  async sendAccountVerificationEmail(
    args: IEmailApiVerificationEmailArgs,
  ): Promise<IEmailApiSendEmailResponse> {
    this.validateEmailSender();

    return this.emailApi!.sendAccountVerificationEmail(args);
  }

  async sendResetPasswordVerificationEmail(
    args: IEmailApiVerificationEmailArgs,
  ): Promise<IEmailApiSendEmailResponse> {
    this.validateEmailSender();

    return this.emailApi!.sendResetPasswordVerificationEmail(args);
  }

  private validateEmailSender(): void {
    if (!this.emailApi) {
      throw new Error("EmailApi is not set");
    }
  }
}

export default EmailSender;
