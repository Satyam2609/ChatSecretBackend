import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
    username:{
        
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    refreshtoken:{
        type:String,
    }
})

    
userSchema.pre("save" , async function(next) {
if(!this.isModified("password")) return next()   
   this.password =  await bcrypt.hash(this.password , 10)
next()
 
})
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password , this.password)
    
}
userSchema.methods.generateAccesstoken = function(){

   return jwt.sign({
        id:this._id,
        name:this.name,
        username:this.username,
        email:this.email,
    },

    process.env.JWT_ACCESS_SECRET,
    {expiresIn:"1d"}

)
}
userSchema.methods.generateRefreshtoken = function(){
   return jwt.sign({
        id:this._id,
        username:this.username,
        email:this.email,
        name:this.name
        
    },
    process.env.JWT_Refresh_SECRET,
    {expiresIn:"10d"}
)
}

export const User = mongoose.model("User" , userSchema)