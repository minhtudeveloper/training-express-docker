
import { Response, Request } from "express";
import authService from "./service";

import { requestError, requestSuccess } from "@/util/response";


const authGoogoleCallBack = (req: Request, res: Response) => {
  const user = req.user;
  authService
    .loginGoogle(user)
    .then(requestSuccess(res))
    .catch(requestError(res));
}


export default {
  authGoogoleCallBack,
}