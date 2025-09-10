import {Router} from 'express';
import { 
    registerUser, 
    loginUser, 
    logoutUser 
} from '../controllers/user.controller.js';
import { upload } from '../middleware/multer.middleware.js';
import { verifyAuth } from '../middleware/verifyAuth.middleware.js';

const userRouter = Router();

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyAuth, logoutUser);


export default userRouter;