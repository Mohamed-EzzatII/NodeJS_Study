import { sequelize } from "../connectionDB.js";
import { DataTypes } from "sequelize";
import { userTable } from "./user.model.js ";
export const productTable = sequelize.define(
    'Product',
    {
        id:{
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        title:{
            type : DataTypes.STRING,
            allowNull : false
        },
        description:{
            type : DataTypes.STRING,
            allowNull : false
        },
        price:{
            type : DataTypes.FLOAT,
            allowNull : false
        } 

    },
    {
        timestamps : true,
    }
);
userTable.hasMany(productTable,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE', 
});
productTable.belongsTo(userTable);