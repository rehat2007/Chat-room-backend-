import { Router } from "express";
import { registeruser, loginuser, logoutuser } from "../controller/user.controller.js"

const authRouter = Router()

authRouter.route("/register").post(registeruser)
authRouter.route("/login").post(loginuser)
authRouter.route("/logout").post(logoutuser)


export default authRouter