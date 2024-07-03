import express from 'express';
import postsRouter from './src/modules/posts/posts.route.js';
import userRouter from './src/modules/users/users.route.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use("/posts", postsRouter);
app.use("/users", userRouter);
app.use("*", (req, res) => res.status(404).send("Not Found"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`))