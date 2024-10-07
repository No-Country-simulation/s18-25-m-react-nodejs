import express from "express";
import con from "./config/database";
import envs from "./config/envs";
import userRouter from "./features/user/routes/userRoutes";
import authUserRoutes from "./features/auth_user/routes/authUserRoutes";
import cookieParser from "cookie-parser";
const { swaggerUi, swaggerSpecs } = require("./config/swagger");
require("dotenv").config();

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    //permite cualquier origen
    callback(null, origin || '*');
  },
  credentials: true
}));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use("/api/v1", userRouter,authUserRoutes);

// Para usar sin la db
// app.listen(PORT, () => {
//   console.log(` Servidor corriendo en ${URL}:${PORT}`);
//   console.log(` Documentación disponible en ${URL}:${PORT}/api-docs`);
// });


con
  .initialize()
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
    app.listen(envs.PORT, () => {
      console.log(` Servidor corriendo en ${envs.URL}:${envs.PORT}`);
      console.log(
        ` Documentación disponible en ${envs.URL}:${envs.PORT}/api-docs`
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });
