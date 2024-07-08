import productModel from "../../../db/models/products.model.js";
import userModel from "../../../db/models/user.model.js";

export const addProduct = async (req,res,next) => {

    const {title,description,userId} = req.body;

    const user = await userModel.findById(userId);

    if(user){
        const product = await productModel.create({title,description,userId});
        return res.status(200).json({msg:"product created",product});
    }
    else{
        return res.status(400).json({msg:"no user found"})
    }
}

export const getAllProduct = async (req,res,next) => {

    const products = await productModel.find({}).populate("userId","username email -_id ");

    if(products){

        return res.status(200).json({products});
    }

    else{
        return res.status(400).json({msg:"no products found"})
    }

}
