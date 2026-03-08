import  express from "express";
import { registeruser } from "../controller/user.controller.js"

const authRouter = express.Router()

authRouter.post("/register",registeruser)
authRouter.route("/login",)
authRouter.route("/logout",)

export default authRouter 