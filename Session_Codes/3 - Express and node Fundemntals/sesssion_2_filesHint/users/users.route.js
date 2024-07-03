import * as PC from "./users.control.js"
import express from "express";
const userRouter = express.Router();

userRouter.get("/",PC.getAllUsers);
userRouter.post("/",PC.addUser);
userRouter.patch("/",PC.updateUser);
userRouter.delete("/",PC.deleteUser);

export default userRouter 