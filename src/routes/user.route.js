import { Router } from "express";
import { protactedRoute } from "../middleware/editprofile.middleware.js"
import { getRecommendedUsers, getMyFriends, sendFriendRequest } from "../controller/loggedinuser.controller.js"

const userRouter = Router()

userRouter.route("/").get( protactedRoute,getRecommendedUsers)
userRouter.route("/friends").get( protactedRoute,getMyFriends)

userRouter.route("/friend-request/:id").post(protactedRoute,sendFriendRequest)

export default userRouter