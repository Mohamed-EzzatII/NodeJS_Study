let posts = [
    {
        title:"medo",
        date :"1",
    },
    {
        title:"ahmed",
        date :"2",
    },
    {
        title:"mohamed",
        date :"3",
    },
    {
        title:"ezzat",
        date :"4",
    },
    
]


export const getAllPosts = (req,res,next)=>{
    res.send(posts);
}

export const updatePost = (req,res,next)=>{
    const index = posts.findIndex((e)=>{
        return e.title == req.body.title;
    });

    if(index == -1){
        res.send("Error! not found");
    }
    else{
        posts[index]=req.body;
        res.write({msg:"updated",posts});
    }
}


export const deletePost = (req,res,next)=>{
    const index = posts.findIndex((e)=>{
        return e.title == req.body.title;
    });

    if(index == -1){
        res.send("Error! not found");
    }
    else{
        posts.splice(index,1);
        res.send({msg:"deleted",posts});
    }
}

export const addPost = (req,res,next) =>{
    posts.push(req.body);
    res.send(posts);
}