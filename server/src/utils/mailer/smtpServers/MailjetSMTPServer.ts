import { config } from "../../../config";
import SMTPServer from "./SMTPServer";

class MailjetSMTPServer extends SMTPServer {
  public host: string;
  public port: number;
  public secure: boolean;
  public auth: { user: string; pass: string };

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
