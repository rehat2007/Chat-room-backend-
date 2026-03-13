import { Router } from "express";
import { protactedRoute } from "../middleware/editprofile.middleware.js"
import { getRecommendedUsers, getMyFriends, sendFriendRequest, acceptFriendRequest, getFriendRequests, outGoingFriendRequest } from "../controller/loggedinuser.controller.js"

const userRouter = Router()

userRouter.route("/").get( protactedRoute,getRecommendedUsers)
userRouter.route("/friends").get( protactedRoute,getMyFriends)

userRouter.route("/friend-request/:id").post(protactedRoute,sendFriendRequest)
userRouter.route("/friend-request/:id/accepted").put(protactedRoute,acceptFriendRequest)

userRouter.route("/friend-requests").get(protactedRoute,getFriendRequests)
userRouter.route("/outgoing-friend-requests").get(protactedRoute,outGoingFriendRequest) 

export default userRouter