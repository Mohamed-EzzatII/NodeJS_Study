import * as PC from "./users.control.js"
import express from "express";
import { checkMail } from "../../middleware/emailExist.js";
const userRouter = express.Router();

userRouter.get("/",PC.getAllUsers);
userRouter.post("/",PC.addUser);
userRouter.patch("/",checkMail,PC.updateUser);
userRouter.delete("/",checkMail,PC.deleteUser);

export default userRouter 