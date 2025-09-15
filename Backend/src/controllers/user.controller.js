import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js'
import User from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.js'

const generateAccessTokenAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId);
        if(!user){
            throw new ApiError(404, "User not found")
        }
        const accessToken = await user.generateAccessToken(); 
        const refreshToken = await user.generateRefreshToken(); 
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return {accessToken, refreshToken};
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens")
    }
}   

const registerUser = asyncHandler(async (req , res)=>{
    const {username, email, password} = req.body;
    if(!username?.trim() || !email?.trim() || !password?.trim()){
        throw new ApiError(400,"Credential Incomplete")
    }
    console.log(email);
    
    //check for existing user
    const existingUser = await User.findOne({ 
        $or: [{ email }, { userName: username }] // Map username to userName
    });
    if (existingUser) {
        throw new ApiError(409, 'User already exists');
    }
    //create user
    const user = await User.create({
        userName: username, // Map username to userName for the model
        email,
        password
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500, "User not found after creation. Something went wrong!")
    }
    return res.status(201).json(new ApiResponse(201, "User registered successfully", createdUser));
    
});
const loginUser = asyncHandler(async (req , res)=>{
    const {email, password} = req.body;
    if(!email?.trim() || !password?.trim()){
        throw new ApiError(400,"Credential Incomplete")
    }
    const user = await User.findOne({ 
        $or: [{ email }, { userName: email }] // Check both email and userName fields
    });
    if(!user){ 
        throw new ApiError(404, "User not found")
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if(!isPasswordCorrect){
        throw new ApiError(401, "Password is incorrect")
    }
    const {accessToken, refreshToken} = await generateAccessTokenAndRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    if(!loggedInUser){
        throw new ApiError(500, "User not found after login. Something went wrong!")
    }
    const options = {   
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }
    res.cookie('refreshToken', refreshToken, options).cookie('accessToken', accessToken, options);
    return res.status(200).json(new ApiResponse(200, "User logged in successfully", {user: loggedInUser, accessToken, refreshToken}));
    
});
const logoutUser = asyncHandler(async (req , res)=>{
    const userId = req.user._id;
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404, "User not found")
    }  
    user.refreshToken = undefined;
    await user.save({validateBeforeSave: false});
    const options = {   
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }
    res.clearCookie('refreshToken', options).clearCookie('accessToken', options);
    return res.status(200).json(new ApiResponse(200, "User logged out successfully", null));
})

const getCurrentUser = asyncHandler(async (req, res) => {
    // This endpoint verifies if the user is authenticated via cookies
    // req.user is populated by auth middleware if cookies are valid
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    return res.status(200).json(new ApiResponse(200, "User retrieved successfully", user));
});

export {registerUser, loginUser, logoutUser, getCurrentUser};