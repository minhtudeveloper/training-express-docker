import { User, validateChangePass } from "../user/model";
import jwt from "@/util/jwt";
import { sendMailForgotPassword } from "@/util/mailer";
import { checkValidate } from "@/util/validate";

const login = (body: any) => {
  return new Promise(async (rs, rj) => {
    try {
      const { email, password } = body;
      const user = await User.findOne({ email });
      if (user && User.comparePassword(password, user.password)) {
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

const resetPassword = (user: any, body: any) => {
  return new Promise(async (rs, rj) => {
    try {
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
        .then((msg: any) => rs('Success send mail forgot password!'))
        .catch((err: any) => rj(err));
    } catch (error) {
      rj(error);
    }
  });
};

const loginGoogle = async (user: any) => {
  return new Promise(async (rs, rj) => {
    try {
      const dataAdduser: any = {
        email: user._json.email,
        google_id: user._json.sub,
        full_name: user._json.name,
        role: 'USER'
      }
      let dataUser: any
      dataUser = await User.findOneAndUpdate({ email: dataAdduser.email }, dataAdduser)
      if (!dataUser) {
        dataUser = await User.create(dataAdduser)
      }
      const tokenToClient = await jwt.generateToken({
        _id: dataUser._id,
        email: dataUser.email,
        full_name: dataUser.full_name,
        role: dataUser.role,
      });

      await User.findByIdAndUpdate(dataUser._id.toString(), {
        token: tokenToClient,
      });
      rs(tokenToClient)
    } catch (error) {
      rj(error)
    }

  })

}

export default {
  login,
  resetPassword,
  forgotPassword,
  loginGoogle
};
