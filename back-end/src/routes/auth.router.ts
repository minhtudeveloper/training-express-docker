import express from "express";
import authCtrl from "@/modules/auth/controller";
const authRouter = express.Router();

authRouter.post("/login", authCtrl.login);
authRouter.put("/reset-password", authCtrl.resetPassword);
authRouter.post("/forgot-password", authCtrl.forgotPassword);

export default authRouter;
