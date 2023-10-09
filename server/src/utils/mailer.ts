import sgMail, { MailService } from "@sendgrid/mail";
import { config } from "../config";
import { IEmailTemplate } from "../emailTemplates";
import { injectable } from "inversify";

@injectable()
class Mailer {
  private readonly _client: MailService;
  constructor() {
    this._client = sgMail;
    this._client.setApiKey(config.SENDGRID_API_KEY);
  }
  async send(template: IEmailTemplate): Promise<[sgMail.ClientResponse, object] | null> {
    if (config.NODE_ENV === "production") {
      return await this._client.send({ from: config.SENDGRID_SENDER, ...template });
    } else {
      return new Promise((resolve) => {
        console.log(template);
        resolve(null);
      });
    }
    return null;
  }
}

export default Mailer;
