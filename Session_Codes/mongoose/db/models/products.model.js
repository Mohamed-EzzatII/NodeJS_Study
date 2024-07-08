import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true
    },
    userId:{
        type : Schema.Types.ObjectId,
        ref : "user"
    },
},{
    timestamps : true
});

const productModel = mongoose.model("product",productSchema);
export default productModel;