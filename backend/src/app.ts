import express from "express";
import { setupSwagger } from "./config/swagger";
import userRoutes from "./features/user/routes/userRoutes";

const app = express();

app.use(express.json());

// Rutas

//Ruta para el recurso de usuario
app.use("/api/v1", userRoutes);

// Inicializa Swagger
setupSwagger(app);

export default app;
