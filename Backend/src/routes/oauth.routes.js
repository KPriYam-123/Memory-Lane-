import {Router} from 'express';
import { oauthLogin } from '../controllers/simpleOauth.controller.js';

const oauthRouter = Router();

oauthRouter.route("/login").post(oauthLogin);

export default oauthRouter;