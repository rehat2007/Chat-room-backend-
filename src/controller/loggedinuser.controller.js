import { asyncHandler } from "../utils/async.Handler.js"
import { errorHandler } from "../utils/errorHandler.js"
import { responseHandler } from "../utils/resHandler.js"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { upsertstreamuser } from "../config/connect.streamchat.js"

// recomended users :
const getRecommendedUsers = asyncHandler(async (req, res) => {
    try {
        const currentUserId = req.user._id
        const currentUser = req.user

        const recomendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },
                { $id: { $nin: currentUser.friends } },
                { isOnboarded: true }
            ]
        })
        return res.status(200).json(new responseHandler(200,recomendedUsers,"Recommended users"))
    }
    catch (error) {
      console.error("Error on recommended user controller",error)
      return res.status(500).json(new errorHandler(500, "internal server error in recommended user controller"))
    }
})

// friends :
const getMyFriends = asyncHandler(async (req, res) => {

})

export { getRecommendedUsers, getMyFriends }