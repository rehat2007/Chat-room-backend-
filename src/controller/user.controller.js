import { asyncHandler } from "../utils/async.Handler.js"
import { errorHandler } from "../utils/errorHandler.js"
import { responseHandler } from "../utils/resHandler.js"
import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

// Register controller :
const registeruser = asyncHandler(async (req, res) => {

   const { fullName, email, password } = req.body

   if ([fullName, email, password].some(field => field?.trim() === "")) {
      throw new errorHandler(409, "All fields are required")
   }
   const existEmail = await User.findOne({ email })
   if (existEmail) {
      throw new errorHandler(401, "User allready exist with this email")
   }
   if (password.length < 8) {
      throw new errorHandler(401, "invalid password")
   }

   const newUser = await User.create({
      fullName,
      email,
      password
   })

   const createdUser = await User.findById(newUser._id).select("-password")
   if (!createdUser) {
      throw new errorHandler(500, "Try again something went wronge while creating user")
   }
   return res.status(201).json(new responseHandler(201, createdUser, "User created successfully"))
})


// Login controller :
const loginuser = asyncHandler(async (req, res) => {
   const { email, password } = req.body

   if ([email, password].some(field => field?.trim() === "")) {
      throw new errorHandler(409, "All fields are required")
   }

   const user = await User.findOne({ email })
   if (!user) {
      throw new errorHandler(404, "Email or Password is incorrect")
   }

   const isPasswordCorrect = await user.ispasswordCorrect(password)
   if (!isPasswordCorrect) {
      throw new errorHandler(405, " Password is incorrect ")
   }

   const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
   if (!token) {
      throw new errorHandler(401, "Failed to generate accesstoken")
   }

   const options = {
      httpOnly: true,
      secure: true
   }
   return res.status(200)
      .cookie("token", token, options)
      .json(new responseHandler(200, "User loggin successfully"))
})


// Logout controller :
const logoutuser = asyncHandler(async (req, res) => {
   res.clearCookie("token")
   return res.status(201).json(new responseHandler(201, " User logout successfully"))
})

//Edit profile controller :

const editProfile = asyncHandler(async (req, res) => {
   const userId = req.user._id
   const { fullName ,bio ,location } = req.body
      if ([fullName ,bio ,location].some(field => field?.trim() === "")) {
      throw new errorHandler(409, "All fields are required")
   }
   const updatedUser = await User.findByIdAndUpdate(userId,{
      fullName ,
      bio ,
      location
   },{new:true})

   if(!updatedUser){
      throw new errorHandler(500 , "Updated user not found")
   }

   return res.status(200).json(new responseHandler(200,"Updated user informations successfully"))
})


// export all
export { registeruser, loginuser, logoutuser, editProfile }