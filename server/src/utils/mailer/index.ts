import EmailSender from "./EmailSender";
import NodemailerEmailApi from "./NodemailerEmailApi";
import { MailjetSMTPServer } from "./smtpServers";

const emailSender = EmailSender.getInstance();

const smtpServer = new MailjetSMTPServer();

const emailApi = new NodemailerEmailApi(smtpServer);

emailSender.setEmailApi(emailApi);

export default emailSender;
