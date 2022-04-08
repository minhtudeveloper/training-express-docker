import jwt from "jsonwebtoken";

import { ENV as env } from "@/config";

const generateToken = (dataInToken: any) => {
  return new Promise<any>((rs, rj) => {
    try {
      const token = jwt.sign(dataInToken, env.TOKEN_SECRET, {
        expiresIn: env.TOKEN_LIFE,
      });
      rs(token);
    } catch (error) {
      rj(error);
    }
  });
};

const verifyToken = (tokenFromClient: string) => {
  return new Promise<any>((rs, rj) => {
    try {
      const data = jwt.verify(tokenFromClient, env.TOKEN_SECRET);
      if (data) {
        rs(data);
      }
    } catch (error) {
      rj(error);
    }
  });
};

export default {
  generateToken,
  verifyToken,
};
