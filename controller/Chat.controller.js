import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


const UserProfile = asyncHandler(async(req , res) => {
   const userId = req.user.id

   const profile = await User.findById(userId).select("-password")
   console.log(profile)

   if(!profile){
    return res.status(401).json({
        success:false,
        message:"profile not found"
    })
   }

   res.status(200).json({
    success:true,
    message:"profile founded",
    profile
   })
})

export default UserProfile