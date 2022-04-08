import { User, UserDocument } from "./model";

const createUser = (body: any) => {
  return new Promise(async (rs, rj) => {
    try {
      const user = await User.create(body);
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

export default {
  createUser,
  getUsers,
};
