import { BaseRepository } from "@/models/baseRepository";
import bcrypt from "bcrypt";
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

class MailRepository extends BaseRepository<MailDocument> {}

export const Mail = new MailRepository("mails", mailSchema);
