import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser'
import router from './Router/user.router.js'

const app = express()

app.use(cors({
    origin: "https://chat-secret-frontend.vercel.app",
    credentials: true // lowercase c
}));
app.use(express.json({limit:"10kb"}))
app.use(express.urlencoded({extended:true , limit:"10kb"}))
app.use(express.static("/public"))
app.use(cookieParser())
app.use("/api" , router)
export default app