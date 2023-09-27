import { injectable } from "inversify";

@injectable()
class EmailVerificationTemplate {
    setup(to: string, verificationCode: string) {
        return {to, subject: "Email verification", text: "Email verification", html: `<h1>${verificationCode}</h1>`}
    }
}

export default EmailVerificationTemplate;