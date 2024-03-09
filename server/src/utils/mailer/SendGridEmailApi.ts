import sgMail, { MailService } from "@sendgrid/mail";
import EmailApi from "./EmailApi";
import { config } from "../../config";

interface IEmailApiArgs {
  to: string;
}

export interface IEmailApiVerificationEmailArgs extends IEmailApiArgs {
  verificationToken: string;
}

export type IEmailApiSendEmailResponse = {
  success: boolean;
};

class SendGridEmailApi extends EmailApi {
  private readonly _client: MailService;
  private readonly _from: string;
  constructor() {
    super();
    this._client = sgMail;
    this._client.setApiKey(config.SENDGRID_API_KEY);
    this._from = config.SENDGRID_SENDER;
  }

  async sendAccountVerificationEmail(
    args: IEmailApiVerificationEmailArgs,
  ): Promise<IEmailApiSendEmailResponse> {
    const { to, verificationToken } = args;

    const verificationLink = `${config.CLIENT_BASE_URL}/verify-email?token=${verificationToken}`;

    const data = {
      to,
      from: this._from,
      subject: "Account verification",
      text: `Account verification link: ${verificationLink}`,
      html: `Account verification link: <a href="${verificationLink}">Click to verify</a>`,
    };

    await this.sendEmail(data);

    return { success: true };
  }

  async sendResetPasswordVerificationEmail(
    args: IEmailApiVerificationEmailArgs,
  ): Promise<IEmailApiSendEmailResponse> {
    const { to, verificationToken } = args;

    const verificationLink = `${config.CLIENT_BASE_URL}/reset-password?token=${verificationToken}`;

    const data = {
      to,
      from: this._from,
      subject: "Reset password verification",
      text: `Reset password verification link: ${verificationLink}`,
      html: `Reset password verification link: <a href="${verificationLink}">Click to verify</a>${verificationToken}`,
    };

    await this.sendEmail(data);

    return { success: true };
  }

  private async sendEmail(data: {
    to: string;
    from: string;
    subject: string;
    text: string;
    html: string;
  }) {
    if (config.NODE_ENV === "development") {
      console.log(data);
      return;
    }

    await this._client.send(data);
  }
}

export default SendGridEmailApi;
