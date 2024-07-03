import connection from './../../../db/connectionDB.js';


export const getAllUsers = (req,res,next)=>{
    connection.execute(
        `SELECT * FROM users`,
        (err,result)=>{
            if(err){
                res.status(400).json({"msg":"error",err});
            }
            else if(result.length > 0){
                res.status(200).json(result);
            }
            else if(result.length == 0) {
                res.status(400).json({"msg":"No users found",result});
            }
        }
    );
}

export const updateUser = (req,res,next)=>{
    connection.execute(
        `select * FROM users WHERE email ="${req.body.email}"`,
        (err,result)=>{
            if(err){
                res.status(400).json({"msg":"error",err});
            }else if(result.length == 0){
                res.status(400).json({"msg":"User not found"});
            }else if(result.length == 1){
                connection.execute(
                    `update users SET name = "${req.body.name}", age = "${req.body.age}" where email = "${req.body.email}"; `,
                    (err,result)=>{
                        if(err){ 
                            res.status(400).json({"msg":"error",err});
                        }
                        else if(result.affectedRows > 0){
                            res.status(200).json({"msg":"User updated successfully", result});
                        }
                        else{
                            res.status(400).json({"msg":"No changes made"});
                        }
                    }
                );
            }
        }
    );
}


export const deleteUser = (req,res,next)=>{

    connection.execute(
        `select * from users where email = "${req.body.email}"`,
        (error,result) =>{
            if(error){
                res.status(400).json({"msg":"error",error});
            }
            else if(result.length == 0){
                res.status(400).json({"msg":"User not found"});
            }else if(result.length == 1){
                connection.execute(`DELETE FROM users where email = "${req.body.email}";`,
                    (error,result)=>{
                        if(error){
                            res.status(400).json({"msg":"error",error});
                        }
                        else if(result.affectedRows > 0){
                            res.status(200).json({"msg":"User deleted successfully", result});
                        }
                        else{
                            res.status(400).json({"msg":"No changes made"});
                        }
                    }
                );
            }

        }

    );
}

export const addUser = (req,res,next) =>{
    connection.execute(
        `select * FROM users WHERE email ="${req.body.email}"`,
        (err,result)=>{
            if(err){
                res.status(400).json({"msg":"error",err});
            }
            else if(result.length > 0){
                res.status(400).json({"msg":"User already exists"});
            }
            else if(result.length == 0){
                connection.execute(
                    `INSERT INTO users (name, age, email) VALUES ("${req.body.name}", "${req.body.age}", "${req.body.email}");`,
                    (err,result)=>{
                        if(err){ 
                            res.status(400).json({"msg":"error",err});
                        }
                        else if(result.affectedRows > 0){
                            res.status(200).json({"msg":"User added successfully", result});
                        }
                        else{
                            res.status(400).json({"msg":"No changes made"});
                        }
                    }
                );
            }
        }
    );
}