import nodemailer from "nodemailer";
import { config } from "../../config";
import EmailApi, {
  IEmailApiSendEmailResponse,
  IEmailApiVerificationEmailArgs,
  IEmailTemplate,
} from "./EmailApi";
import Mail from "nodemailer/lib/mailer";
import SMTPServer from "./smtpServers/SMTPServer";

class NodemailerEmailApi extends EmailApi {
  private readonly _transporter: Mail;
  private readonly _from: string;
  constructor(private readonly _smtpServer: SMTPServer) {
    super();
    this._transporter = nodemailer.createTransport(this._smtpServer);
    this._from = config.SMTP_SENDER;
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

  private async sendEmail(data: IEmailTemplate) {
    if (config.NODE_ENV === "development") {
      console.log(data);
      return;
    }

    await this._transporter.sendMail(data);
  }
}

export default NodemailerEmailApi;
