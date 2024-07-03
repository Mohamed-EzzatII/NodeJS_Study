let users = [
    {
        name:"medo",
        age :"1",
    },
    {
        name:"ahmed",
        age :"2",
    },
    {
        name:"mohamed",
        age :"3",
    },
    {
        name:"ezzat",
        age :"4",
    },
    
]


export const getAllUsers = (req,res,next)=>{
    res.send(users);
}

export const updateUser = (req,res,next)=>{
    const index = users.findIndex((e)=>{
        return e.name == req.body.name;
    });

    if(index == -1){
        res.send("Error! not found");
    }
    else{
        users[index]=req.body;
        res.send({msg:"updated",users});
    }
}


export const deleteUser = (req,res,next)=>{
    const index = users.findIndex((e)=>{
        return e.name == req.name;
    });

    if(index == -1){
        res.send("Error! not found");
    }
    else{
        users.splice(index,1);
        res.send({msg:"deleted",users});
    }
}

export const addUser = (req,res,next) =>{
    users.push(req.body);
    res.send(users);
}