import jwt from "jsonwebtoken";
import {signature} from "../modules/User/user.controllers.js";
import userModel from "../../db/models/user.model.js"  

export const checkTokenValid =(anyParam) =>{
    return  async (req,res,next)=>{
        try {
            console.log(anyParam);
            //destruct the token
            const token = req.params.token;
            console.log(token); 
            //no token send
            if(!token){
                return res.status(400).json({msg:"No token send"});
            }
     
            // the token doesn't starts with ezzat__
            if(!token.startsWith("ezzat__")){
                return res.status(400).json({msg:"invalid bearer"});
            }
     
            //split the real token from the bearer+token
            const realToken = token.split("ezzat__")[1]; //returns [{""},{token}]
            
            //decrypt the token and get the user
            const decoded = jwt.verify(realToken,signature);  
            console.log(decoded)
            //the token is not decoded or doesn't contain an id
            if(!decoded){
                return res.status(400).json({msg:"invalid payload"});
            }
            
            //find the required user
            const user = await userModel.findOne({email : decoded.email});
            
            //no user found
            if(!user){
                return res.status(400).json({msg:"invalid user"});
            }
            
            req.user = user;
            next();
            
        } catch (error) {
            return res.status(400).json({msg:"token invalid",error});
        }
    }

}