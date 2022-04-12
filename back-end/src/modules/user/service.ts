import { checkValidate } from "@/util/validate";
import { User, validateChangePass } from "./model";
import { UserCreateDto, UserDeleteDto, UserEditDto } from "./dto";

const createUser = (body: UserCreateDto) => {
  return new Promise(async (rs, rj) => {
    try {
      const data: UserCreateDto = {
        email: body.email,
        password: body.password,
        full_name: body.full_name,
        status: "ACTIVE",
        role: body.role,
      };
      const user = await User.create(data);
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

const changePassword = (user: any, body: any) => {
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

const editUser = (body: any) => {
  // edit by [id , email]
  return new Promise(async (rs, rj) => {
    try {
      const data: UserEditDto = {
        _id: body._id,
        email: body._id ? undefined : body.email,
        full_name: body.full_name,
        status: body.status,
        role: body.role,
      };
      User.updateOne(
        { $or: [{ _id: data._id }, { email: data.email }] },
        data,
      ).then((result) => {
        if (result) rs("Success changed!");
        else rj("change fails!");
      });
    } catch (error) {
      rj(error);
    }
  });
};

const deleteUser = (body: any) => {
  // delete by [id , email]
  return new Promise(async (rs, rj) => {
    try {
      const data: UserDeleteDto = {
        _id: body._id,
        email: body.email,
        status: "DELETED",
      };
      User.deleteOneFlag(
        { $or: [{ _id: data._id }, { email: data.email }] },
        data,
      ).then((result) => {
        if (result) rs("Success deleted!");
        else rj("change fails!");
      });
    } catch (error) {
      rj(error);
    }
  });
};

export default {
  createUser,
  getUsers,
  changePassword,
  editUser,
  deleteUser,
};
