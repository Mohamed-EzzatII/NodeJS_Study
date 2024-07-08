import express from 'express';
import * as UC from './user.controllers.js';
import {checkTokenValid} from '../../middlewares/Authentication.js';

const userRouter = express.Router();
userRouter.post("/signUp",UC.userSignUp);
userRouter.get("/activeAccount/:token",checkTokenValid(),UC.confirmEmail);
userRouter.patch("/changePassword",UC.updateUserPasswordByEmail);
userRouter.post("/addUsers",UC.addUsersForTesting);
userRouter.patch("/updateUserName",UC.updateUserNameById);
userRouter.get("/signInToken/:token",checkTokenValid(),UC.signInByToken);
userRouter.get("/signIn",UC.signIn);
export default userRouter; 
