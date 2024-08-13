import { config } from "dotenv";

config();

export const configDb = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
    },
    production: {
        username: "your_username",
        password: "your_password",
        database: "your_database",
        host: "your_host",
        dialect: "mysql",
    },
};
