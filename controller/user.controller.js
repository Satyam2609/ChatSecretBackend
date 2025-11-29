import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import uploadCloudinary from "../utils/cloudinary.js";

const generateAccesstokenAndRefreshtoken = async (userID) => {
   try {
     const user = await User.findById(userID)
     const accesstoken = await user.generateAccesstoken()
     const refreshtoken = await user.generateRefreshtoken()
     user.refreshtoken = refreshtoken
     await user.save({validateBeforeSave:false})
     return {accesstoken , refreshtoken}
   } catch (error) {
    throw new Error("token not generated")
    
   }
}

const registerUser = asyncHandler(async(req , res) => {
  const {username , email ,password, name , phonenumber} = req.body
  console.log(req.body)

  if ([username, email, password, name, phonenumber].some(field => !field || field.trim() === "")) {
  return res.status(400).json({ success: false, message: "All fields are required" });
}


  const exsistUser = await User.findOne({$or:[{username} , {email}]})
  if(exsistUser){
    res.status(401).json({
      success:false,
      message:"Username or email already exsist"
    })
  }

 const uploadImage = req.file?.path;
  if(!uploadImage){
    res.status(400).json({
      success:false,
      message:"image is required"
    })
  }
  const cloudinaryUpload = await uploadCloudinary(uploadImage)
  if(!cloudinaryUpload){
    res.status(400).json({
      success:false,
      message:"image not found"
    })
  } 


  const newUser = await User.create({
    username,
    email,
    name,
    password,
    phonenumber,
    avatar:cloudinaryUpload.secure_url
  })
  const user = await User.findById(newUser._id).select("-password -refreshtoken")
  if(!user){
    res.status(400).json({
      success:false,
      message:"user not found"
    })
  }

  return res.status(201).json({
    success:true,
    message:"user registered successfully",
    user
  })


})

const loginUser = asyncHandler(async(req , res) => {
  const {email , password , name} = req.body
  console.log(req.body)

  if([email , password , name].some((feilds) => feilds.trim()==="")){
    res.status(400).json({
      success:false,
      message:"All feilds are required"
    })
  }
  const user  = await User.findOne({$or:[{email} , {name}]})
  if(!user){
    res.status(404).json({
      success:false,
      message:"user not found"
    })
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password)
  if(!isPasswordCorrect){
    res.status(401).json({
      success:false,
      message:"incorrect password",
    })

  }
  const {accesstoken , refreshtoken} = await generateAccesstokenAndRefreshtoken(user._id)

  const option = {
    httpOnly:true,
    secure:true,
    sameSite: "None",
  }
  const loggedInuser = await User.findById(user._id).select("-password -refreshtoken")

  return res.status(200)
  .cookie("accesstoken" , accesstoken , option)
  .cookie("refreshtoken" , refreshtoken , option)
  .json({
    success:true,
    message:"user Logged in successfully",
    user:loggedInuser,
    accesstoken,
    refreshtoken
  })

})

const loggout = asyncHandler(async(req , res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set:{
        refreshtoken:null
      }
    },
    {
      new:true,
    }
  )
 const option = {
  httpOnly: true,
  secure: true,
  path: "/" , 
  sameSite: "None",// important
};


 return res.status(200)
  .clearCookie("accesstoken", option)
  .clearCookie("refreshtoken", option)
  .json({ success:true, message:"user logged out successfully" });
})

  


export {
  registerUser,
  loginUser,
  loggout
}