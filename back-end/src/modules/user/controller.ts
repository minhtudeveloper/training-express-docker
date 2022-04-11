import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { requestSuccess, requestError } from "@/util/response";
import userServices from "./service";

const getUsers = (req: Request, res: Response): void => {
  userServices.getUsers().then(requestSuccess(res)).catch(requestError(res));
};

const createUser = (req: Request, res: Response): any => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    requestError(res)(errors.array());
  } else {
    userServices.createUser(req.body)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }
};

const changePassword = (req: Request, res: Response): any => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    requestError(res)(errors.array());
  } else {
    userServices.changePassword(req.user, req.body)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }
};

const editUser = (req: Request, res: Response): any => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    requestError(res)(errors.array());
  } else {
    userServices.editUser(req.body)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }
};

const deleteUser = (req: Request, res: Response): any => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    requestError(res)(errors.array());
  } else {
    userServices.deleteUser(req.body)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }
};

export default {
  getUsers,
  createUser,
  changePassword,
  editUser,
  deleteUser
};
