import { Router } from "express";
import { registeruser, loginuser, logoutuser } from "../controller/user.controller.js"
import { editProfile } from "../controller/editprofile.controller.js";

const router = Router()

// Auth routes :
router.route("/register").post(registeruser)
router.route("/login").post(loginuser)
router.route("/logout").post(logoutuser)

// Edit profile route :
router.route("/profile").post(editProfile)



export default router