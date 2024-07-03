import connection from './../../../db/connectionDB.js';


export const getAllPosts = (req,res,next)=>{
    connection.execute(
        `SELECT * FROM posts`,
        (err,result)=>{
            if(err){
                res.status(400).json({"msg":"error",err});
            }
            else if(result.length > 0){
                res.status(200).json(result);
            }
            else if(result.length == 0) {
                res.status(400).json({"msg":"No Posts found",result});
            }
        }
    );
}

export const updatePost = (req,res,next)=>{
    connection.execute(
        `select * FROM posts WHERE title ="${req.body.title}"`,
        (err,result)=>{
            if(err){
                res.status(400).json({"msg":"error",err});
            }else if(result.length == 0){
                res.status(400).json({"msg":"Post not found"});
            }else if(result.length == 1){
                connection.execute(
                    `update posts SET title = "${req.body.title}", description = "${req.body.description}" where title = "${req.body.title}"; `,
                    (err,result)=>{
                        if(err){ 
                            res.status(400).json({"msg":"error",err});
                        }
                        else if(result.affectedRows > 0){
                            res.status(200).json({"msg":"Post updated successfully", result});
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


export const deletePost = (req,res,next)=>{

    connection.execute(
        `select * from posts where title = "${req.body.title}"`,
        (error,result) =>{
            if(error){
                res.status(400).json({"msg":"error",error});
            }
            else if(result.length == 0){
                res.status(400).json({"msg":"Post not found"});
            }else if(result.length == 1){
                connection.execute(`DELETE FROM posts where title = "${req.body.title}";`,
                    (error,result)=>{
                        if(error){
                            res.status(400).json({"msg":"error",error});
                        }
                        else if(result.affectedRows > 0){
                            res.status(200).json({"msg":"Post deleted successfully", result});
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

export const addPost = (req,res,next) =>{
    connection.execute(
        `select * FROM posts WHERE title ="${req.body.title}"`,
        (err,result)=>{
            if(err){
                res.status(400).json({"msg":"error",err});
            }
            else if(result.length > 0){
                res.status(400).json({"msg":"Post already exists"});
            }
            else if(result.length == 0){
                connection.execute(
                    `INSERT INTO posts (description, userID, title) VALUES ("${req.body.description}", "${req.body.userID}", "${req.body.title}");`,
                    (err,result)=>{
                        if(err){ 
                            res.status(400).json({"msg":"error",err});
                        }
                        else if(result.affectedRows > 0){
                            res.status(200).json({"msg":"Post added successfully", result});
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