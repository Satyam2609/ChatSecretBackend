import connectDB from "./DB/index.js";
import dotenv from "dotenv"
import app from "./app.js"

dotenv.config({
    path:"./.env"
})

connectDB()
.then(() => {
    app.listen(process.env.PORT , () => {
        console.log(`server is running on port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("Database connection failed", error);
})
