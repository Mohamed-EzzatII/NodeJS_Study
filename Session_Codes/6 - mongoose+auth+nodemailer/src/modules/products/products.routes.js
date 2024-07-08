import express from 'express';
import * as PC from './products.controllers.js';

const productRouter = express.Router();

productRouter.post("/addProduct",PC.addProduct);
productRouter.get("/getProducts",PC.getAllProduct);
export default productRouter;

