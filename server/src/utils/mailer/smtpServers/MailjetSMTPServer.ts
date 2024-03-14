import { injectable } from "inversify";
import { config } from "../../../config";
import SMTPServer from "./SMTPServer";

@injectable()
class MailjetSMTPServer extends SMTPServer {
  public readonly host: string;
  public readonly port: number;
  public readonly secure: boolean;
  public readonly auth: { user: string; pass: string };

  constructor() {
    super();
    this.host = "in-v3.mailjet.com";
    this.port = config.NODE_ENV === "development" ? 587 : 465;
    this.secure = config.NODE_ENV === "production";
    this.auth = {
      user: config.MAILJET_API_KEY,
      pass: config.MAILJET_API_SECRET,
    };
  }
}

export default MailjetSMTPServer;
