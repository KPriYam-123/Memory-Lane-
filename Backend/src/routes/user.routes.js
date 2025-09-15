import {Router} from 'express';
import { 
    registerUser, 
    loginUser, 
    logoutUser,
    getCurrentUser
} from '../controllers/user.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import { verifyAuth } from '../middleware/verifyAuth.middleware.js';

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyAuth, logoutUser);
userRouter.route("/current-user").get(verifyAuth, getCurrentUser);


export default userRouter;