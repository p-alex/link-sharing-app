abstract class SMTPServer {
  public abstract readonly host: string;
  public abstract readonly port: number;
  public abstract readonly secure: boolean;
  public abstract readonly auth: { user: string; pass: string };
}

export default SMTPServer;
