import connectionDB from "./db/connectionDB.js";
import express from 'express';
import userRouter from "./src/modules/User/user.routes.js";
import productRouter from "./src/modules/products/products.routes.js";

// connect to the database
connectionDB();

const app = express()
export const port = 10000
app.use(express.json());
app.use('/user',userRouter);
app.use('/product',productRouter);
app.use("*",(req,res,next)=>{res.status(404).json({"error":"Path not found"})})

try{
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
}catch(error){
console.log(error);
}