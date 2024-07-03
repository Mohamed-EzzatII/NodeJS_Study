import { userTable } from "../../../db/models/user.model.js";


export const addUser = async (req,res,next) => {
    const {name,email,password,age,gender} = req.body;
    // const user = await userTable.create({name,email,password,age,gender});
    try{
    const user = await userTable.bulkCreate(req.body);
    // const user = await userTable.findOrCreate({
    //     defaults : {name,email,password,age,gender},
    //     where : {email}
    // }
    // );

    // if(user[1])
    //     return res.json({message : "User Created Successfully",user});
    // else
    return res.json({message : "User created",user});
    }catch(error){
        return res.json({message : "unknown error",error});
    }
};

export const findMales = async (req,res,next) => {
    const males = await userTable.findAll({
        where: {
            gender : "male"
        }
    });

    if(males.length == 0){
        res.json({msg:"No Males Found",males});
    }
    else{
        res.json({msg:"Males Found",males});
    }
}

export const findFemales = async (req,res,next) => {
    const females = await userTable.findAll({
        where: {
            gender : "female"
        }
    });

    if(females.length == 0){
        res.json({msg:"No Females Found",females});
    }
    else{
        res.json({msg:"Females Found",females});
    }
}

export const findById = async (req,res,next) => {
 
    const user = await userTable.findByPk(req.params.id);

    if(user == null){
        res.json({msg:"No users Found",user});
    }
    else{
        res.json({msg:"user Found",user});
    }
}

export const findFirstMale = async (req,res,next) => {
 
    const user = await userTable.findOne({
        where:{
            gender:"male",
        }
    });

    if(user == null){
        res.json({msg:"No males Found",user});
    }
    else{
        res.json({msg:"male Found",user});
    }
}

export const findMalesAndCount = async (req,res,next) => {
 
    const user = await userTable.findAndCountAll({
        where:{
            gender:"male",
        }
    });

    if(user[0] == 0){
        res.json({msg:"No males Found",user});
    }
    else{
        res.json({msg:"male Found",user});
    }
}

export const deleteById = async (req,res,next) => {
 
    const no_deleted = await userTable.destroy({
        where:{
            id : req.params.id
        }
    });

    if(no_deleted){
        res.json({
            msg : "user found and deleted",
            number : no_deleted
        });
    }
    else{
        res.json({
            msg : "no user found",
            number : no_deleted
        });
    }
}

export const updateName = async (req,res,next)=>{
    const user = await userTable.update(
    {
        name : req.params.name
    },
    {
        where : {
            id : req.params.id
        }
    }
);
if(user[0] == 0){
    res.json({msg : "no user found"});
}
else{
    res.json({
        msg:"name updated",
    });
    console.log(user[1]);
}
}


export const UserLogin = async (req,res,next) =>{

    const {email,password} = req.body;

    const user = await userTable.findOne({
        where:{
            email
        }
    });

    if(user == null){
        console.log("email wrong");
        return res.json({msg:"invalid email or password"});
    }

    if (user.password == password){
        return res.json({msg:"welcome"});
    }
    else{
        console.log("password wrong");
        return res.json({msg:"invalid email or password"});
    }

}