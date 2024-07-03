import connection from "../../db/connectionDB.js";

export const checkMail = (req,res, next) => {
connection.execute(`select * FROM users where email="${req.body.email}"`, (err, result) => {
    if(err) {
        return res.status(400).json({"msg":"error",err});
    }
    else if(result.length == 0) {
        return res.status(400).json({"msg":"user doesn't exist"});
    }
    else{
        next();
    }
});
}