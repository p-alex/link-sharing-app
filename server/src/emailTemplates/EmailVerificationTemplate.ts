import { injectable } from "inversify";
import { config } from "../config";

@injectable()
class EmailVerificationTemplate {
  setup(to: string, verificationToken: string) {
    return {
      to,
      subject: "Email verification",
      text: "Email verification",
      html: `
        <h1>
            <a href="${config.CLIENT_BASE_URL}/verify-email?token=${verificationToken}">Click here to verify</a>
        </h1>
      `,
    };
  }
}

export default EmailVerificationTemplate;
