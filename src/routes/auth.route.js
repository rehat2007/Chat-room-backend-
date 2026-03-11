import { Router } from "express";
import { registeruser, loginuser, logoutuser, editProfile  } from "../controller/user.controller.js"
import { protactedRoute } from "../middleware/editprofile.middleware.js"

const router = Router()

// Auth routes :
router.route("/register").post(registeruser)
router.route("/login").post(loginuser)
router.route("/logout").post(logoutuser)

// Edit profile route :
router.route("/profile").post(protactedRoute, editProfile)


export default router