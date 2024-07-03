import { productTable } from './../../../db/models/products.model.js';


export const addProduct = async (req,res,next) => {
    try{
    const user = await productTable.bulkCreate(req.body);
    return res.json({message : "User created",user});
    }catch(error){
        return res.json({message : "unknown error",error});
    }
};
