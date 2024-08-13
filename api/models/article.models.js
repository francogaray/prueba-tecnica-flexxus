import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const Article = sequelize.define(
    "articles",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        timestamps: true,
        paranoid: true,
    }
);

export default Article;
