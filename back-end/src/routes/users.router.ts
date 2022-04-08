import express from "express";
import userCtrl from "@/modules/user/controller";
const userRouter = express.Router();

userRouter.get("/", userCtrl.getUsers);
userRouter.post("/", userCtrl.createUser);
userRouter.put("/change-password", userCtrl.changePassword);

export default userRouter;
