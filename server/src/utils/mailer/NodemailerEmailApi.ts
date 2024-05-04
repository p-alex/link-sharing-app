import nodemailer from "nodemailer";
import { config } from "../../config";
import EmailApi, {
  IEmailApiSendEmailResponse,
  IEmailApiVerificationEmailArgs,
  IEmailTemplate,
} from "./EmailApi";
import Mail from "nodemailer/lib/mailer";
import { injectable } from "inversify";
import { MailjetSMTPServer } from "./smtpServers";
import makeEmailTemplate from "./makeEmailTemplate";
import LocalSMTPServer from "./smtpServers/LocalSMTPServer";

@injectable()
class NodemailerEmailApi extends EmailApi {
  private readonly _transporter: Mail;
  private readonly _from: string;

  constructor(
    private readonly _smtpServer: MailjetSMTPServer,
    private readonly _localSmtpServer: LocalSMTPServer,
  ) {
    super();
    this._transporter = nodemailer.createTransport(
      config.NODE_ENV === "production" ? this._smtpServer : this._localSmtpServer,
    );
    this._from = config.SMTP_SENDER;
  }

  async sendAccountVerificationEmail(
    args: IEmailApiVerificationEmailArgs,
  ): Promise<IEmailApiSendEmailResponse> {
    const { to, token } = args;

    const verificationLink = `${config.CLIENT_BASE_URL}/verify-email?token=${token}`;

    const data = {
      to,
      from: this._from,
      subject: "Devlinks account verification",
      text: `Devlinks account verification link: ${verificationLink}`,
      html: makeEmailTemplate({
        title: "Account Verification",
        description: "Please click on the button below to verify your account.",
        linkButton: { href: verificationLink, value: "Verify Account" },
      }),
    };

    await this.sendEmail(data);

    return { success: true };
  }

  async sendResetPasswordVerificationEmail(
    args: IEmailApiVerificationEmailArgs,
  ): Promise<IEmailApiSendEmailResponse> {
    const { to, token } = args;

    const verificationLink = `${config.CLIENT_BASE_URL}/reset-password?token=${token}`;

    const data = {
      to,
      from: this._from,
      subject: "Reset password verification",
      text: `Reset password verification link: ${verificationLink}`,
      html: makeEmailTemplate({
        title: "Password Reset",
        description: "Please click the button below to reset your password.",
        linkButton: { href: verificationLink, value: "Reset Password" },
      }),
    };

    await this.sendEmail(data);

    return { success: true };
  }

  private async sendEmail(data: IEmailTemplate) {
    await this._transporter.sendMail(data);
  }
}

export default NodemailerEmailApi;
