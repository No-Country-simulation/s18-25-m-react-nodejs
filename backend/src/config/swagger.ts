import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Definir opciones para Swagger
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Developer Social Network API",
      version: "1.0.0",
      description: "Documentación de la API usando Swagger",
    },
    servers: [
      {
        url: "http://ec2-100-25-217-101.compute-1.amazonaws.com",
      },
    ],
  },
  apis: ["./src/features/**/emtities/*.ts"], // Ruta a todas las subcarpetas dentro de src/features
};

// Generar la especificación de Swagger
const swaggerSpecs = swaggerJsdoc(swaggerOptions);

export { swaggerUi, swaggerSpecs };
