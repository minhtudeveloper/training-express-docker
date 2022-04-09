import express from "express";
import userCtrl from "@/modules/user/controller";
import { useAuth, useRoles } from '@/modules/auth/middleware'
const userRouter = express.Router();

userRouter.get("/", useRoles(['ADMIN']), userCtrl.getUsers);
userRouter.post("/", userCtrl.createUser);
userRouter.put("/edit", useAuth, userCtrl.editUser);
userRouter.delete("/delete", useRoles(['ADMIN']), userCtrl.deleteUser);
userRouter.put("/change-password", useAuth, userCtrl.changePassword);

export default userRouter;
