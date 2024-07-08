import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true

    },
    lastName : {
        type : String,
        required : true

    },
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    recoveryEmail : {
        type : String,
        required : true,
    },
    DOB : {
        type : Date,
        required : true
    },
    mobileNumber : {
        type : String,
        required : true,
        unique : true
    },
    role : {
        type : String,
        required : true,
        enum : ["User","Company_HR"]
    },
    
    status : {
        type : String,
        default : "offline",
        enum : ["online","offline"]
    },
},{
    timestamps : true
});

const userModel = mongoose.model("user",userSchema);
export default userModel;