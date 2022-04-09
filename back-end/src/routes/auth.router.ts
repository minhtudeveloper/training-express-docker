import express from "express";
import { useAuth, useRoles } from '@/modules/auth/middleware'
import authCtrl from "@/modules/auth/controller";
import socialCtrl from "@/modules/auth/social.login";
import passport from "passport"

const authRouter = express.Router();

authRouter.post("/login", authCtrl.login);
authRouter.put("/reset-password", useAuth, authCtrl.resetPassword);
authRouter.post("/forgot-password", authCtrl.forgotPassword);

//login google
authRouter.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));
authRouter.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    socialCtrl.authGoogoleCallBack);


export default authRouter;
