import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js'
import User from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.js'
const registerUser = asyncHandler(async (req , res)=>{
    const {userName, email, password} = req.body;
    if(!userName.trim() || !email.trim() || !password.trim()){
        throw new ApiError(400,"Credential Incomplete")
    }
    console.log(email);
    
    //check for existing user
    const existingUser = await User.findOne({ 
        $or: [{ email }, { userName }]
    });
    if (existingUser) {
        throw new ApiError(409, 'User already exists');
    }
    //create user
    const user = await User.create({
        userName,
        email,
        password
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500, "User not found after creation. Something went wrong!")
    }
    return res.status(201).json(new ApiResponse(201, "User registered successfully", createdUser));
    
});
export {registerUser}