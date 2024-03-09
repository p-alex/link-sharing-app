import { config } from "../../../config";
import SMTPServer from "./SMTPServer";

class SendgridSMTPServer extends SMTPServer {
  public host: string;
  public port: number;
  public secure: boolean;
  public auth: { user: string; pass: string };

  constructor() {
    super();
    this.host = "smtp.sendgrid.net";
    this.port = config.NODE_ENV === "development" ? 587 : 465;
    this.secure = config.NODE_ENV === "production";
    this.auth = {
      user: "apikey",
      pass: config.SENDGRID_API_KEY,
    };
  }
}

export default SendgridSMTPServer;
