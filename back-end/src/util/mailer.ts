import nodemailer from "nodemailer";
import { ENV as env } from "@/config";
import { MailCreateDto } from "@/modules/mail/dto";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: env.MAIL_USER, // generated ethereal user
    pass: env.MAIL_PASS, // generated ethereal password
  },
});

export const mailFrom = 'minhtudevelopertest@gmail.com'



const sendMailForgotPassword = (token: string, receiver: any) => {
  const options = () => ({
    from: `"Hasagiiiiiiiiii" <${mailFrom}>`,
    to: 'a@mailinator.com',
    subject: "Do you want to get the password or get Hassagiiiii",
    html: content()
  });

  const content = () => `
              <div style="padding: 10px; background-color: white;">
                  <h4 style="color: #0085ff">Forgot password</h4>
                  <a href="${env.URL_FE}/changepassword/${token}">${env.URL_FE}/changepassword/${token}</a>
              </div>
      `;

  return new Promise((rs, rj) => {
    try {
      transporter.sendMail(
        options(),
        (err, info) => {
          if (err) rj(err);
          else rs(info.response);
        },
      );
    } catch (error) {
      rj(error);
    }
  });

}



const sendMailMessage = (dataMail: MailCreateDto) => {
  const options = () => ({
    from: `"Notification from Hasagiiiiiiiiii" <${mailFrom}>`,
    to: dataMail.to,
    subject: dataMail.subject,
    html: content(dataMail.content)
  });

  const content = (text: string) => `
      <div style="padding: 16px; background-color: white; border:10px solid rgb(96, 113, 155)ed">
        <p>${text}</p>
      </div>
    `;

  return new Promise((rs, rj) => {
    try {
      transporter.sendMail(
        options(),
        (err, info) => {
          if (err) rj(err);
          else rs(info.response);
        },
      );
    } catch (error) {
      rj(error);
    }
  });

}


export { sendMailForgotPassword, sendMailMessage };
