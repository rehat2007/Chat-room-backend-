import { Router } from "express";
import { registeruser, loginuser, logoutuser, editProfile  } from "../controller/user.controller.js"
import { responseHandler } from "../utils/resHandler.js";
import { protactedRoute } from "../middleware/editprofile.middleware.js"

const router = Router()

// Auth routes :
router.route("/register").post(registeruser)
router.route("/login").post(loginuser)
router.route("/logout").post(logoutuser)

// Edit profile route :
router.route("/profile").post(protactedRoute, editProfile)

// chack if user is logged in :
router.route("/me").get(protactedRoute, (req,res)=>{
return res.status(200).json(new responseHandler(200,"User loggd in",User.req.user))
})


export default router