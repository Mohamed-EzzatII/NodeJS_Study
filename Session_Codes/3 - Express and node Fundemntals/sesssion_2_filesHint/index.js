import usersRouter from "./users/users.route.js"
import postsRouter from "./posts/posts.route.js"
import express from "express";
const app = express();

app.use(express.json());
app.use("/users",usersRouter);
app.use("/posts",postsRouter);

app.listen(3000,()=>{

    console.log("connected to port 3000");

});