import { Sequelize } from "sequelize";
import { configDb } from "./config.js";

const sequelize = new Sequelize(
    configDb.development.database,
    configDb.development.username,
    configDb.development.password,
    {
        host: configDb.development.host,
        dialect: configDb.development.dialect,
    }
);

sequelize
    .sync()
    .then(() => {
        console.log("Database conexion exitosa");
    })
    .catch((error) => {
        console.error("Error al conectars a la base de datos:", error);
    });

export default sequelize;
