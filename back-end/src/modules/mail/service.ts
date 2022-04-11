import { MailCreateDto } from "./dto";
import { sendMailMessage, mailFrom } from "@/util/mailer";
import { Mail } from './model'

const getMails = () => {
  return new Promise(async (rs, rj) => {
    try {
      const mails = await Mail.find();
      if (mails) {
        rs(mails);
      }
    } catch (error) {
      rj(error);
    }
  });
};

const createMail = (body: any) => {
  return new Promise(async (rs, rj) => {
    try {
      const data: MailCreateDto = {
        from: mailFrom,
        to: body.to,
        subject: body.subject,
        content: body.content
      }

      sendMailMessage(data)
        .then(async (msg: any) => {
          Mail.create(data).then((result: any) => {
            if (result) rs('Success send mail message!')
          }).catch((err: any) => rj(err));
        })
        .catch((err: any) => rj(err));
    } catch (error) {
      rj(error);
    }
  });
}

export default {
  getMails,
  createMail
}