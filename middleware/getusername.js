import Jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getUsername = asyncHandler(async (req, res) => {
   const token = req.cookies?.accesstoken || req.headers?.authorization?.replace("Bearer ", "")
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized, token not found" });
    }

    let decodedToken;
    try {
        decodedToken = Jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }

    return res.status(200).json({ success: true, user:decodedToken});
});
