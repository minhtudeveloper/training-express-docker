import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { requestSuccess, requestError } from "@/util/response";
import mailServices from "./service";

const getMails = (req: Request, res: Response): void => {
  mailServices.getMails().then(requestSuccess(res)).catch(requestError(res));
};

const createMail = (req: Request, res: Response): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    requestError(res)(errors.array());
  } else {
    mailServices.createMail(req.body)
      .then(requestSuccess(res))
      .catch(requestError(res));
  }
}

export default {
  getMails,
  createMail
}