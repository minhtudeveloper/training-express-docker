import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { requestSuccess, requestError } from "../../util/response";
import UserServices from "./service";

const getUsers = (req: Request, res: Response): void => {
  UserServices.getUsers().then(requestSuccess(res)).catch(requestError(res));
};

const createUser = (req: Request, res: Response): any => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    requestError(res)(errors.array());
  } else {
    UserServices.createUser(req.body)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }
};

export default {
  getUsers,
  createUser,
};
