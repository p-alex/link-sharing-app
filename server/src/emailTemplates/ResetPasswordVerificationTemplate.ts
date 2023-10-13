import { injectable } from "inversify";
import { config } from "../config";

@injectable()
class ResetPasswordVerificationTemplate {
  setup(to: string, verificationToken: string) {
    return {
      to,
      subject: "Reset password email confirmation",
      text: "Reset password email confirmation",
      html: `
        <h1>
            <a href="${config.CLIENT_BASE_URL}/reset-password?token=${verificationToken}">Reset password</a>
        </h1>
      `,
    };
  }
}

export default ResetPasswordVerificationTemplate;
