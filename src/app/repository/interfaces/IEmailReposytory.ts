import { EmailPayload } from "../../models/email";

export interface IEmailRepository {
    Find<T>(id: string): Promise<EmailPayload>;
}