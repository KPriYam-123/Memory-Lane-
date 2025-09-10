import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const verifyAuth = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized: No token provided");
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        await User.findById(decodedToken._id).select("-password -refreshToken");
        if (!user) {
            throw new ApiError(401, "Unauthorized: Invalid token");
        }
        req.user = user;
        next(); 
    } catch (error) {
        throw new ApiError(401, "Unauthorized: Invalid token");
    }
})