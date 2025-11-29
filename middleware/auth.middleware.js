import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const verifyUser = asyncHandler(async(req , res , next) => {
   try {
     const token = req.cookies?.accesstoken || req.headers?.authorization?.replace("Bearer ", "")
     if(!token){
        return res.status(401).json({
             success:false,
             Message:"Unauthorized user , token not found"
         })
     }
     console.log("token in verify user middleware" , token)
 
     const decoded = jwt.verify(token , process.env.JWT_ACCESS_SECRET)
     console.log("---------------",decoded)
     const user = await User.findById(decoded?.id)
     console.log(user)
     if(!user){
         res.status(401).json({
             success:false,
             Message:"Unauthorized user , user not found"
         })
     }
     req.user = user
     next() 
   } catch (error) {
    res.status(401).json({
        success:false,
        Message:"Unauthorized user , invalid token"
    })
    
   }         
})