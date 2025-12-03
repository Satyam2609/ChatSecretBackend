import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import uploadCloudinary from "../utils/cloudinary.js";


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

const updateProfile = asyncHandler(async(req , res) => {
    const {username , name , phonenumber} = req.body


    let avatardata

if(req.files?.avatar){
    avatardata = await uploadCloudinary(req.files.avatar)
}


const updatefeild = {
    username,
    phonenumber,
    name
}
if(avatardata?.url){
    updatefeild.avatar = avatardata.url
}
    const updateUser = await User.findByIdAndUpdate(req.user.id ,updatefeild , {new:true})


    res.status(200).json({
        success:true,
        message:"updated successsfully",
        user:updateUser
    })

})

export {
    updateProfile,
    UserProfile
}