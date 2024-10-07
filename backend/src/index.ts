import express from "express";
import con from "./config/database";
import userRouter from "./features/user/routes/userRoutes";
import authUserRoutes from "./features/auth_user/routes/authUserRoutes";
import cookieParser from "cookie-parser";
import { swaggerUi, swaggerSpecs } from "./config/swagger";
require("dotenv").config();

import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      //permite cualquier origen
      callback(null, origin || "*");
    },
    credentials: true,
  })
);

const PORT = process.env.SERVER_PORT || 3000;
const URL = process.env.SERVER_URL || "http://localhost";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use("/api/v1", userRouter, authUserRoutes);

// Para usar sin la db
// app.listen(PORT, () => {
//   console.log(` Servidor corriendo en ${URL}:${PORT}`);
//   console.log(` Documentación disponible en ${URL}:${PORT}/api-docs`);
// });

con
  .initialize()
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
    app.listen(PORT, () => {
      console.log(` Servidor corriendo en ${URL}:${PORT}`);
      console.log(` Documentación disponible en ${URL}:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
