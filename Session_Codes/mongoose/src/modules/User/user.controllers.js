import userModel from "../../../db/models/user.model.js"
import jwt from "jsonwebtoken"
import { sendMail } from "../../services/sendMail.js";
import { port } from "../../../index.js";

export const signature = "securityTokenGamedFa45";

export const addUsersForTesting = async (req,res,next) =>{
    try {
        
        // push the document to the database
        await userModel.create(req.body);
    
    } catch (error) { 
        res.status(301).json({
            msg : "error!! can not add user",
            error
        });    
    }
}


export const userSignUp = async (req,res,next) =>{
    try {
        
        //destruct the required data 
        const {firstName,lastName,email,password,recoveryEmail,DOB,mobileNumber,role} = req.body;
        
        // check the email existence 
        const emailExist = await findUserByEmail(email); 
        if(emailExist){
            return res.status(400).json({msg:"Email Already Exists"});
        }

        // check the mobileNumber existence 
        const mobileNumberExist = await findUserByMobileNumber(mobileNumber);
        if(mobileNumberExist){
            return res.status(400).json({msg:"Mobile Number Already Exists"});
        }

        // create the document
        const userInstance = new userModel({firstName,lastName,username : firstName+" "+lastName,email,password,recoveryEmail,DOB,mobileNumber,role});

        // push the document to the database
        const user = await userInstance.save();

        //create a token 
        const token = jwt.sign({email,password},signature,{expiresIn : '1h'});

        // check user email 
        const link = `http://localhost:${port}/user/activeAccount/${"ezzat__"+token}`;
        const html = `<a href='${link}'>confirm your email here</a>`;
        const checkMail = await sendMail(email,"Email Confirmation",html);
        console.log(checkMail);
        if(!checkMail){
            return res.status(200).json({msg : "successfully sign up,please check your mail ",user,token});
        }
        return res.status(200).json({msg : "successfully sign up,please check your mail ",user,token});
    
    } catch (error) {
        res.status(301).json({
            msg : "error!! can not add user",
            error
        });    
    }
}

export const confirmEmail = async (req,res,next) =>{

    const user = req.user; 
    if(user.status == "offline"){
        const userUpdate = await userModel.findOneAndUpdate({email : user.email},{status : "online"});
        return res.status(400).json({msg:"confirmed"});
    }
    else{
        return res.status(400).json({msg:"already confirmed"});
    }
}
export const signInByToken = async (req,res,next) =>{

    const user = await checkToken(req.user.email,req.user.password); 
    if(!user){
        return res.status(300).json({msg:"user not found "});
    }
    else if(user.status == "online"){
        return res.status(200).json({msg:"logged in",user,checkMailTest});
    }
    else{
        return res.status(300).json({msg:"error",user});
    }
} 

export const signIn = async (req,res,next) =>{

    const {email,password} = req.body; 
    const user = await userModel.findOne({email,password,status:"online"});
    if(!user){
        return res.status(300).json({msg:"user not found "});
    }
    else{
        const token = jwt.sign({email,password},signature,{expiresIn : '1h'});

        return res.status(200).json({msg:"logged in",user,token});
    }
}

export const updateUserPasswordByEmail = async (req,res,next)=>{
    //destruct the required data 
    const {email,oldPassword,newPassword} = req.body;
    //check if the both passwords are matched
    if(oldPassword == newPassword){
        return res.status(400).json({msg:"password matches"});
    }
    //check the email and password
    const emailExist = await checkEmailAndPassword(email,oldPassword);
    // email and password are correct
    if(emailExist){
        const updated = await userModel.updateOne({email},{password : newPassword});
        if(updated.modifiedCount == 1){
            return res.status(200).json({msg:"password updated"});
        }
        else{
            return res.status(300).json({msg:"update error"});
        }
    }
    // email and password are not correct
    else{
        return res.status(400).json({msg:"Wrong email or password"});
    }
}

export const updateUserNameById = async (req,res,next)=>{
    //destruct the required data 
    const {id,username} = req.body;
    //update username
    const user = await userModel.findByIdAndUpdate(
        {_id : id},
        {username}
    );
    //id found
    if(user){
        return res.status(200).json({msg:"username updated"});
    }
    //id not found
    else{
        return res.status(400).json({msg:"id not found"});
    }
}
const checkToken = async (email,password) =>{
    try {     
        const user = await userModel.findOne({email,password});
        return user;
    } catch (error) {
        console.log(error);
        return error;
    }  
}


const findUserByEmail = async (email)=>{

    const emailExist = await userModel.findOne({email});
    return emailExist;

}

const findUserByMobileNumber = async (mobileNumber)=>{

    const mobileNumberExist = await userModel.findOne({mobileNumber});
    return mobileNumberExist;

}

const checkEmailAndPassword = async (email,password)=>{

    const userExist = await userModel.findOne({email,password});
    return userExist;

}
