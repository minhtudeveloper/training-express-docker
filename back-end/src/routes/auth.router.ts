import express from "express";
import userCtrl from "../modules/user/controller";
const authRouter = express.Router();

authRouter.post("/login", userCtrl.createUser);

export default authRouter;
