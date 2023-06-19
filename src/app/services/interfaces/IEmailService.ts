import { EmailPayload } from "../../models/email";

export interface IEmailService {
  getEmailbyID(emailId: string): Promise<EmailPayload>;
  sendEmail(emailPayload: EmailPayload): Promise<void>;
}
