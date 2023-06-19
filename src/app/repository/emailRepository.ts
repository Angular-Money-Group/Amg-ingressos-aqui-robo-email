import { EmailPayload, emailCollection } from "./../models/email";
import { Logger } from "./../services/logger.service";
import { IEmailRepository } from "./interfaces/IEmailReposytory";

export class EmailRepository implements IEmailRepository {
  constructor() {}

  async Find(id: string): Promise<any> {
    try {
      return await emailCollection.findById(id).then((res) => {return res});
    } catch (Error) {
      Logger.fatalLog("Email não enviado: " + Error);
      return Promise.reject();
    }
  }
}
