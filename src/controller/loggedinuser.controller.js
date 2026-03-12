import { asyncHandler } from "../utils/async.Handler.js"
import { errorHandler } from "../utils/errorHandler.js"
import { responseHandler } from "../utils/resHandler.js"
import { User } from "../models/user.model.js"

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
   try {
    const user = await User.findById(req.user._id).select("friends").populate("friends","fullName")
    return res.status(200).json(new responseHandler(200,user.friends,"Get friends successfullu"))
   } catch (error) {
    console.error("Error on get friends controller",error)
    return res.status(500).json(new errorHandler(500, "Get friends controller failed"))
   }
})

// friend-request:
const sendFriendRequest = asyncHandler(async(req,res)=>{

})


export { getRecommendedUsers, getMyFriends, sendFriendRequest }