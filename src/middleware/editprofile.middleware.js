import { User } from "../models/user.model.js"
import { asyncHandler } from "../utils/async.Handler.js"
import { errorHandler } from "../utils/errorHandler.js"
import { responseHandler } from "../utils/resHandler.js"
import jwt from "jsonwebtoken"

const protactedRoute = async(req ,res , next)=>{
 try {
       const incodedtoken = req.cookies.token
       if(!incodedtoken){
           throw new errorHandler(401, "No token pronided")
       }
       const decodedToken = jwt.verify(incodedtoken,process.env.ACCESS_TOKEN_SECRET)
       if(!decodedToken){
           throw new errorHandler(401,"Invalid token")
       }
       const user = await User.findById(decodedToken.userId).select("-password")
       if(!user){
           throw new errorHandler(404 , "User not found")
       }
       req.user = user

       next()
 } catch (error) {
    console.log("Error in editprofile protacted route",error);
 }
}
export { protactedRoute }