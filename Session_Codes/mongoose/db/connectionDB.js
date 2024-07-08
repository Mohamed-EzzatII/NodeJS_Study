import mongoose from "mongoose";
//mongodb://127.0.0.1:27017

const connectionDB = async ()=>{

    // if testDB is not created, it will create it for you
    return await mongoose.connect("mongodb://127.0.0.1:27017/testDB")
    .then(()=>{
        console.log("Connected to database");
    }).catch((error)=>{
        console.log("cannot connect to the database");
    });
}

export default connectionDB;