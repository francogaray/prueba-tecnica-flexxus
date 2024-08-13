import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import articleRoutes from "./routes/article.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { authenticateUser } from "./middlewares/auth.js";
import sequelize from "./config/sequelize.js";

const app = express();

//Configuración
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Rutas
app.use("/api/articles", /* authenticateUser,  */ articleRoutes); // Para poder acceder a las rutas del api se necesita tener un token el mismo se genera  con un usuario y contraseña válido ( "admin", "password") en una solicitud POST en la ruta de abajo. Luego devuelve el token que se agrega manualmente en postman para procesar las solicitudes
// Se puede comentar funcion "authenticateUser" linea 21 para poder ver los artículos en el navegador

app.use("/api/auth", authRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec)); // Documentacion en Swagger

//Run server
app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);
    console.log(`http://localhost:${app.get("port")}`);
});
