import swaggerJSDoc from "swagger-jsdoc";

export const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "API - Prueba Técnica Flexxus",
        version: "1.0.0",
        description:
            "Documentación del API para la prueba Técnica de Flexxus para el puesto de desarrollador Backend.",
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "Development server",
        },
    ],
    components: {
        schemas: {
            Article: {
                type: "object",
                required: ["name", "brand"],
                properties: {
                    id: {
                        type: "integer",
                        description: "The article ID",
                    },
                    name: {
                        type: "string",
                        description: "The article name",
                    },
                    brand: {
                        type: "string",
                        description: "The article brand",
                    },
                    isActive: {
                        type: "boolean",
                        description: "The article's activation status",
                    },
                },
            },
            Error: {
                type: "object",
                properties: {
                    error: {
                        type: "string",
                        description: "Error message",
                    },
                },
            },
        },
    },
    tags: [
        {
            name: "Articles",
            description: "Endpoints relacionados a artículos",
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ["./routes/*.js", "./controllers/*.js"],
};

export const swaggerSpec = swaggerJSDoc(options);
