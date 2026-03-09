import { asyncHandler } from "../utils/async.Handler.js"
import { errorHandler } from "../utils/errorHandler.js"
import { responseHandler } from "../utils/resHandler.js"
import { User } from "../models/user.model.js"
 
const registeruser = asyncHandler( async (req,res) => {

   const { fullName ,email ,password } = req.body 

   if([fullName,email,password].some(field => field?.trim() === "")){
     throw new errorHandler( 409 , "All fields are required" )
   }
   const existEmail = await User.findOne({email})
   if (existEmail){
      throw new errorHandler ( 401 , "User allready exist with this email")
   }
   if(password.length < 8){
      throw new errorHandler ( 401 , "invalid password")
   }
  
   const newUser = await User.create({
      fullName,
      email,
      password
   })

   const createdUser = await User.findById(newUser._id).select("-password")
   if(!createdUser){
      throw new errorHandler ( 500, "Try again something went wronge while creating user")
   }

   return res.status(201).json( new responseHandler(201 ,createdUser,"User created successfully" )) 
   
})

export { registeruser }