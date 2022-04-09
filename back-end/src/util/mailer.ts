import nodemailer from "nodemailer";
import { ENV, ENV as env } from "@/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: env.MAIL_USER, // generated ethereal user
    pass: env.MAIL_PASS, // generated ethereal password
  },
});

const optionsMailer = (receiver: string, html: string) => ({
  from: '"Hasagiiiiiiiiii" <minhtudevelopertest@gmail.com>',
  to: receiver,
  subject: "Do you want to get the password or get Hassagiiiii",
  html,
});

const contentMailer = (token: string) => `
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Forgot password</h4>
                <a href="${env.URL_FE}/changepassword/${token}">${env.URL_FE}/changepassword/${token}</a>
            </div>
    `;

const sendMailForgotPassword = (token: string, receiver: string) =>
  new Promise((rs, rj) => {
    try {
      transporter.sendMail(
        optionsMailer(receiver, contentMailer(token)),
        (err, info) => {
          if (err) rj(err);
          else rs(info.response);
        },
      );
    } catch (error) {
      rj(error);
    }
  });



export { sendMailForgotPassword };
