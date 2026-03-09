import { Router } from "express";
import { registeruser } from "../controller/user.controller.js"

const authRouter = Router()

authRouter.route("/register").post(registeruser)

export default authRouter