import { asyncHandler } from "../utils/async.Handler.js"

const registeruser = asyncHandler( async ()=>{
   const {fullName,email,password} = req.body 
   console.log(fullName);
   
})

export { registeruser }