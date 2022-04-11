import express from "express";
import mailCtrl from "@/modules/mail/controller";
import {  useRoles } from '@/modules/auth/middleware'
const userRouter = express.Router();

userRouter.get("/", useRoles(['ADMIN']), mailCtrl.getMails);
userRouter.post("/", useRoles(['ADMIN']), mailCtrl.createMail);


export default userRouter;
