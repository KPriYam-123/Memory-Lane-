import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyAuth = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "No token provided");
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        throw new ApiError(401, `Token verification failed: ${err.message}`);
    }

    const user = await User.findById(decodedToken._id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(401, "User not found");
    }

    req.user = user;
    next();
});