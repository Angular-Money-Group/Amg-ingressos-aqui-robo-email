import { EmailRepository } from "./../repository/emailRepository";
import dotenv from "dotenv";
import nodemailer, { SendMailOptions, Transporter } from "nodemailer";
import { Logger } from "./logger.service";
import { EmailPayload } from "../models/email";

dotenv.config();

const _emailRepository = new EmailRepository();

export class EmailService {
  private transporter?: Transporter;
  public userInformation: string = "";

  constructor() {}

  async getEmailbyID(emailId: string): Promise<any> {
    try {
      return await _emailRepository.Find(emailId);
    } catch (error) {
      Logger.fatalLog("Email não encontrado: " + error);
      return Promise.reject(error);
    }
  }

  async sendEmail(emailPayload: EmailPayload) {
    try {
      this.transporter = nodemailer.createTransport({
        host: process.env.HOST_EMAIL,
        port: 465,
        secure: true,
        auth: {
          user: emailPayload.Sender,
          pass: process.env.PASSWORD_EMAIL,
        },
      });

      const options: SendMailOptions = {
        from: emailPayload.Sender,
        to: emailPayload.To,
        subject: emailPayload.Subject,
        html: emailPayload.Body,
      };

      Logger.infoLog("Enviando email");
      this.transporter
        .sendMail(options)
        .then(() => {
          Logger.infoLog("Email enviado");
          return Promise.resolve();
        })
        .catch((err) => {
          Logger.errorLog("Email não enviado: " + err);
          Promise.reject(err);
        });
    } catch (error: any) {
      Logger.fatalLog("Email não enviado: " + error);
      Promise.reject(error);
      throw error;
    }
  }
}

export default EmailService;
