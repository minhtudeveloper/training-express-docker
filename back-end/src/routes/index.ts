import express from "express";
const router = express.Router();

import usersRouter from "./users.router";
import authRouter from "./auth.router";
import mailRouter from "./mail.router";

router.use(authRouter);
router.use("/user", usersRouter);
router.use("/mail", mailRouter);

export default router;
