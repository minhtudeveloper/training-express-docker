import jwt from "@/util/jwt";
import { checkValidate } from "@/util/validate";
import { User, UserDocument, StatusUser, validateChangePass } from "./model";

const createUser = (body: any) => {
  return new Promise(async (rs, rj) => {
    try {
      const status: StatusUser = "ACTIVE";
      const user = await User.create({ ...body, status });
      if (user) {
        rs("Successfully");
      }
    } catch (error) {
      rj(error);
    }
  });
};

const getUsers = () => {
  return new Promise(async (rs, rj) => {
    try {
      const users = await User.find();
      if (users) {
        rs(users);
      }
    } catch (error) {
      rj(error);
    }
  });
};

const changePassword = (token: string, body: any) => {
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

export default {
  createUser,
  getUsers,
  changePassword,
};
