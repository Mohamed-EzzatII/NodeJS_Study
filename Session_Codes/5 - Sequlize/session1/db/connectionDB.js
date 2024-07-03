import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('session4', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' 
});

export const testConnection = async ()=>{
    try {
        await sequelize.authenticate();
        console.log("Connected successfully");
    } catch (error) {
        console.log("Error in connection, Error description : \n",error);
    }
}


export const dbConnection = async ()=>{
    try {
        await sequelize.sync({alter : true, force : false});
        console.log("Connected successfully");
    } catch (error) {
        console.log("Error in connection, Error description : \n",error);
    }
}