import express from "express";
const router = express.Router();

import usersRouter from "./users.router";
import authRouter from "./auth.router";

router.use(authRouter);
router.use("/user", usersRouter);

export default router;
