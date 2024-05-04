import { injectable } from "inversify";
import SMTPServer from "./SMTPServer";

@injectable()
class LocalSMTPServer extends SMTPServer {
  public readonly host: string;
  public readonly port: number;
  public readonly secure: boolean;
  public readonly auth: { user: string; pass: string };

  constructor() {
    super();
    this.host = "localhost";
    this.port = 1025;
    this.secure = false;
    this.auth = {
      user: "project.1",
      pass: "secret.1",
    };
  }
}

export default LocalSMTPServer;
