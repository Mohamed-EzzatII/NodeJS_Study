import * as PC from "./posts.control.js"
import express from "express";
const postRouter = express.Router();

postRouter.get("/",PC.getAllPosts);
postRouter.post("/",PC.addPost);
postRouter.patch("/",PC.updatePost);
postRouter.delete("/",PC.deletePost);
export default postRouter;