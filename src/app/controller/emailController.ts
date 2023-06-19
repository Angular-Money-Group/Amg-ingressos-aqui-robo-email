import { Request, Response } from "express";
import EmailService from "../services/emailService";
import {
  internalServerErrorResponse,
  successResponse,
} from "../utils/responses.utils";

const emailService = new EmailService();

export class EmailController {
  constructor() {}

  public async sendEmail(req: Request, res: Response) {
    try {
      var emailTemplate: any = await emailService.getEmailbyID(
        req.body.emailID
      );

      if (!emailTemplate) {
        throw new Error("Sem template");
      }

      await emailService
        .sendEmail(emailTemplate._doc)
        .then((o) => {
          return successResponse(res, o);
        })
        .catch((err) => {
          return internalServerErrorResponse(res, err.message);
        });
    } catch (err: any) {
      return internalServerErrorResponse(res, err.message);
    }
  }
}
