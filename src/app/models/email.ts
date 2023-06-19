import mongoose from "mongoose";

const emailModel = new mongoose.Schema({
  sender: {type: String},
  to: {type: String},
  subject: {type: String},
  attachments: {type: String},
  body: {type: String},
})

export const emailCollection = mongoose.model("templateEmail", emailModel);

export interface EmailPayload {
  Sender: string;
  To: string;
  Subject: string;
  Attachments: any;
  Body: string;
}

