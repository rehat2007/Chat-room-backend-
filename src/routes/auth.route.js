import { Router } from "express";
import { registeruser, loginuser, logoutuser } from "../controller/user.controller.js"

const router = Router()

router.route("/register").post(registeruser)
router.route("/login").post(loginuser)
router.route("/logout").post(logoutuser)



export default router