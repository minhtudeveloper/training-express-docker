import { User, UserDocument, validateChangePass } from "../user/model";
import jwt from "@/util/jwt";
import { sendMailForgotPassword } from "@/util/mailer";
import { checkValidate } from "@/util/validate";

const login = (body: any) => {
  return new Promise(async (rs, rj) => {
    try {
      const { email, password } = body;
      const user = await User.findOne({ email });
      if (user && new User().comparePassword(password, user.password)) {
        const tokenToClient = await jwt.generateToken({
          _id: user._id,
          email: user.email,
          full_name: user.full_name,
          role: user.role,
        });
        await User.findByIdAndUpdate(user._id.toString(), {
          token: tokenToClient,
        });
        rs(tokenToClient);
      } else {
        rj("Email or password is wrong");
      }
    } catch (error) {
      rj(error);
    }
  });
};

const resetPassword = (token: string, body: any) => {
  return new Promise(async (rs, rj) => {
    try {
      if (token === "") rj("Token not found");
      const user = await jwt.verifyToken(token);
      const errorValidate = checkValidate(validateChangePass.validate(body));
      if (errorValidate) rj(errorValidate);
      if (user) {
        await User.updateOne(
          { _id: user._id.toString() },
          {
            password: body.password,
          },
        )
          .then((result) => {
            if (result) rs("Success changed!");
            else rj("change fails!");
          })
          .catch((err) => {
            rj(err);
          });
      } else {
        rj("Token is wrong");
      }
    } catch (error) {
      rj(error);
    }
  });
};

const forgotPassword = (body: any) => {
  return new Promise(async (rs, rj) => {
    try {
      const { email } = body;
      const user: any = await User.findOne({ email });
      if (!user) rj("Email not found");
      const tokenToClient = await jwt.generateToken({
        _id: user._id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      });
      sendMailForgotPassword(tokenToClient, email)
        .then((msg: any) => rs(msg))
        .catch((err: any) => rj(err));
    } catch (error) {
      rj(error);
    }
  });
};

export default {
  login,
  resetPassword,
  forgotPassword,
};
