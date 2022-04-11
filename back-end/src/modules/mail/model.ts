import bcrypt from "bcrypt";
// import crypto from "crypto";
import mongoose from "mongoose";

export type MailDocument = mongoose.Document & {
  from: string;
  to: string;
  subject: string;
  content: string;

};

const mailSchema = new mongoose.Schema<MailDocument>(
  {
    from: String,
    to: String,
    subject: String,
    content: String,

  },
  { timestamps: true },
);


export const Mail = mongoose.model<MailDocument>("mails", mailSchema);
