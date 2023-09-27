import EmailVerificationTemplate from "./EmailVerificationTemplate";

export interface IEmailTemplate {
    to: string,
    subject: string,
    text: string,
    html: string
}

export default {EmailVerificationTemplate}