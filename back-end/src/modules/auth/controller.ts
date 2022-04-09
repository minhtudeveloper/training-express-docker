import { Response, Request } from "express";
import authService from "./service";

import { requestError, requestSuccess } from "@/util/response";

const login = (req: Request, res: Response) => {
  authService
    .login(req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
};

const resetPassword = (req: Request, res: Response) => {
  authService
    .resetPassword(req.user, req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
};

const forgotPassword = (req: Request, res: Response) => {
  authService
    .forgotPassword(req.body)
    .then(requestSuccess(res))
    .catch(requestError(res));
};

export default {
  login,
  resetPassword,
  forgotPassword,
};
