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

const oauthLogin = asyncHandler(async (req, res) => {
    const { email, name, picture, provider = 'google' } = req.body;
    
    console.log('OAuth login request received:', { email, name, provider });
    
    if (!email) {
        throw new ApiError(400, "Email is required from OAuth provider");
    }

    try {
        // Check if user exists in database
        let user = await User.findOne({ email });
        
        if (user) {
            console.log('Existing user found:', user.email);
            
            // User exists - generate our own tokens and login
            const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);
            
            const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
            
            const options = {   
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            }
            
            res.cookie('refreshToken', refreshToken, options)
               .cookie('accessToken', accessToken, options);
               
            console.log('Existing user logged in successfully:', user.email);
               
            return res.status(200).json(new ApiResponse(200, "User logged in successfully via OAuth", {
                user: loggedInUser, 
                accessToken, 
                refreshToken,
                isNewUser: false
            }));
            
        } else {
            console.log('Creating new user for:', email);
            
            // User doesn't exist - create new user
            const newUser = await User.create({
                userName: name || email.split('@')[0], // Use name or email prefix as username
                email,
                password: Math.random().toString(36), // Generate random password (won't be used)
                profilePicture: picture,
                authProvider: provider,
                isOAuthUser: true
            });

            const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(newUser._id);
            
            const createdUser = await User.findById(newUser._id).select("-password -refreshToken");
            
            const options = {   
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            }
            
            res.cookie('refreshToken', refreshToken, options)
               .cookie('accessToken', accessToken, options);
               
            console.log('New user created and logged in:', newUser.email);
               
            return res.status(201).json(new ApiResponse(201, "User created and logged in successfully via OAuth", {
                user: createdUser, 
                accessToken, 
                refreshToken,
                isNewUser: true
            }));
        }
        
    } catch (error) {
        console.error('OAuth login error:', error);
        throw new ApiError(500, "Failed to process OAuth login");
    }
});

export { oauthLogin };