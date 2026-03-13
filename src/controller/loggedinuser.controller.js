import { asyncHandler } from "../utils/async.Handler.js"
import { errorHandler } from "../utils/errorHandler.js"
import { responseHandler } from "../utils/resHandler.js"
import { FriendRequest } from "../models/friendrequest.model.js"
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
        return res.status(200).json(new responseHandler(200, recomendedUsers, "Recommended users"))
    }
    catch (error) {
        console.error("Error on recommended user controller", error)
        return res.status(500).json(new errorHandler(500, "internal server error in recommended user controller"))
    }
})

// friends :
const getMyFriends = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("friends").populate("friends", "fullName")
        return res.status(200).json(new responseHandler(200, user.friends, "Get friends successfullu"))
    } catch (error) {
        console.error("Error on get friends controller", error)
        return res.status(500).json(new errorHandler(500, "Get friends controller failed"))
    }
})

// send friend-request:
const sendFriendRequest = asyncHandler(async (req, res) => {
    const senderId = req.user._id
    const { id: reciverId } = req.params
    try {
        if (senderId === reciverId) {
            throw new errorHandler(400, "You can't send friend request yourself")
        }
        const reciver = await User.findById(reciverId)
        if (!reciver) {
            throw new errorHandler(404, "Reciver not found")
        }
        if (reciver.friends.includes(senderId)) {
            throw new errorHandler(400, "You are already faiend with this user")
        }
        const existRequest = await FriendRequest.findOne({
            $or: [
                { sender: senderId, reciver: reciverId },
                { sender: reciverId, reciver: senderId }
            ],
        })
        if (existRequest) {
            throw new errorHandler(402, "A friend request already exist between you and this youser")
        }
        const friendRequest = await FriendRequest.create({
            sender: senderId,
            reciver: reciverId
        })
        if (!friendRequest) {
            throw new errorHandler(500, "Failed to dend friend request ")
        }
        return res.status(202).json(200, friendRequest, "Friend request successfully sended")
    } catch (error) {
        console.error("Error occored in sendFriendRequest controller ", error)
        return res.status(500).json(new errorHandler(500, "Error occored in sendFriendRequest controller"))
    }
})

// accept friend-request:
const acceptFriendRequest = asyncHandler(async (req, res) => {
    try {
        const { id: requestId } = req.params
        const friendrequest = await FriendRequest.findById(requestId)
        if (!friendrequest) {
            throw new errorHandler(404, "friend request not found")
        }
        if (friendrequest.reciver.toString() !== req.user._id) {
            throw new errorHandler(403, "You are not authorized to accept this request")
        }

        friendrequest.status = "accepted"
        await friendrequest.save();

        // Update the sender and reciver :
        await User.findOneAndUpdate(friendrequest.sender, {
            $addToSet: { friends: friendrequest.reciver }
        })
        await User.findOneAndUpdate(friendrequest.reciver, {
            $addToSet: { friends: friendrequest.sender }
        })

        return res.status(201).json(new responseHandler(200, "Friend request is accepted"))
    } catch (error) {
        console.error("Error occored in accept friend request controller", error)
        return res.status(500).json(new errorHandler(500, "Friend request failed to accept"))
    }
})

// get friend requests:
const getFriendRequests = asyncHandler(async (req, res) => {
    try {
        const incommingRequest = await FriendRequest.find({ reciver: req.user._id, status: pending }).populate("sender", "fullName bio location")
        const acceptedRequest = await FriendRequest.find({ sender: req.user._id, status: accepted }).populate("reciver", "fullName location")
        return res.status(200).json(new responseHandler(200, { incommingRequest, acceptedRequest }))
    } catch (error) {
        console.error("error occored in get friend request controller", error)
        res.status(500).json(500, "Can not get incomming friend requests")
    }
})

// out going friend-request :
const outGoingFriendRequest = asyncHandler(async(req,res)=>{
try {
    const outgoingrequest = await FriendRequest.find({sender:req.user._id,status:pending}).populate("reciver","fullName location")
    return res.status(202),json(new responseHandler(202,outgoingrequest))
} 
catch (error) {
    console.error("error occored in out going request controller",error)
    return res.status(500).json(new errorHandler(500,"Internal server error"))
}
})

export { getRecommendedUsers, getMyFriends, sendFriendRequest, acceptFriendRequest, getFriendRequests, outGoingFriendRequest}