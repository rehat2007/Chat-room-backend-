import { generateStreamToken } from "../config/connect.streamchat.js";
import { responseHandler } from "../utils/resHandler.js";
import { errorHandler } from "../utils/errorHandler.js";

export function getStreamToken(req,res) {
    try {
        const token = generateStreamToken(req.user._id)
        return res.status(200).json(new responseHandler(200, {token}))
    } catch (error) {
        console.error("Error in getstream token controller",error)
        return res.status(500).json(new errorHandler(500, "Internal server error"))
    }
}