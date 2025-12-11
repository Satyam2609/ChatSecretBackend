import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'
import router from './Router/user.router.js'
import dotenv from 'dotenv'

const app = express()
dotenv.config();
app.use(cors({
    origin: process.env.ENV ||"*",
    credentials: true // lowercase c
}));
app.use(express.json({limit:"10kb"}))
app.use(express.urlencoded({extended:true , limit:"10kb"}))
app.use(express.static("/public"))  
app.use(cookieParser())
app.use("/api" , router)
export default app