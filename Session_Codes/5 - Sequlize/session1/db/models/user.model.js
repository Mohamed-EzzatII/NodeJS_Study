import { sequelize } from "../connectionDB.js";
import { DataTypes } from "sequelize";
export const userTable = sequelize.define(
    'User',
    {
        id:{
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name:{
            type : DataTypes.STRING,
            allowNull : false
        },
        email:{
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },
        gender:{
            type : DataTypes.ENUM("Male","Female"),
            allowNull : true,
        },
        age:{
            type : DataTypes.FLOAT,
            allowNull : false
        },
    },
    {
        timestamps : true,
    }
);