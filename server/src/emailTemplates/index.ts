import EmailVerificationTemplate from "./EmailVerificationTemplate";
import ForgetPasswordVerificationTemplate from "./ResetPasswordVerificationTemplate";

export interface IEmailTemplate {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export default { EmailVerificationTemplate, ForgetPasswordVerificationTemplate };
