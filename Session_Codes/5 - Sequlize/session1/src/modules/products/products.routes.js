import express from 'express';
import * as UC from './products.controllers.js';

const productRouter = express.Router();
productRouter.post("/addProducts",UC.addProduct);

export default productRouter;