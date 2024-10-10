import express from 'express';
import 'express-async-errors';

import con from './config/database';
import envs from './config/envs';
import { swaggerSpecs, swaggerUi } from './config/swagger';
import authUserRoutes from './features/auth_user/routes/authUserRoutes';
import imageRouter from './features/image/imageRoutes';
import postRouter from './features/post/postRoutes';
import projectRouter from './features/project/projectRoutes';
import socialNetworksRouter from './features/social_networks/socialNetworksRoutes';
import technologyRouter from './features/technology/technologyRoutes';
import userRouter from './features/user/userRoutes';
import { globalErrors } from './middlewares/GlobalErrors';
import { setBaseMiddlewares } from './middlewares/SetBaseMiddlewares';
import { healthcheck } from './utils/healthcheck';
import { redirectToDocs } from './utils/redirectToDocs';

const app = express();

setBaseMiddlewares(app);

app.get('/', redirectToDocs);
app.use('/health', healthcheck);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(
  '/api/v1',
  userRouter,
  authUserRoutes,
  projectRouter,
  postRouter,
  technologyRouter,
  imageRouter,
  socialNetworksRouter,
);

app.use(globalErrors);

con
  .initialize()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
    app.listen(envs.PORT, () => {
      console.log(` Servidor corriendo en ${envs.URL}:${envs.PORT}`);
      console.log(` Documentación disponible en ${envs.URL}:${envs.PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
