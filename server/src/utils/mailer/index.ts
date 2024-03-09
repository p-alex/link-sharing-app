import EmailSender from "./EmailSender";
import SendGridEmailApi from "./SendGridEmailApi";

const emailSender = EmailSender.getInstance();
emailSender.setEmailApi(new SendGridEmailApi());

export default emailSender;
