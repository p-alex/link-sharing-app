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
  async send(template: IEmailTemplate) {
    return this._client.send({ from: "devlinks@pistolalex.com", ...template });
  }
}

export default Mailer;
