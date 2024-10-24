import chalk from 'chalk';
import express from 'express';
import 'express-async-errors';

import path from 'path';
import con from './config/database';
import envs from './config/envs';
import { swaggerSpecs, swaggerUi } from './config/swagger';
import authUserRoutes from './features/auth_user/routes/authUserRoutes';
import commentRouter from './features/comment/commentRoutes';
import imageRouter from './features/image/imageRoutes';
import likeRouter from './features/like/likeRoutes';
import notificationRouter from './features/notification/notificationRoutes';
import postRouter from './features/post/postRoutes';
import projectRouter from './features/project/projectRoutes';
import socialNetworksRouter from './features/social_networks/socialNetworksRoutes';
import technologyRouter from './features/technology/technologyRoutes';
import userRouter from './features/user/userRoutes';
import { globalErrors } from './middlewares/GlobalErrors';
import { setBaseMiddlewares } from './middlewares/SetBaseMiddlewares';
import fuRouter from './services/fileupload/fleuploadRutes';
import { healthcheck } from './utils/healthcheck';
import { redirectToDocs } from './utils/redirectToDocs';

export const app = express();

setBaseMiddlewares(app);

app.get('/api', redirectToDocs);
app.use('/api/health', healthcheck);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(
  '/api/v1',
  userRouter,
  authUserRoutes,
  projectRouter,
  postRouter,
  technologyRouter,
  imageRouter,
  socialNetworksRouter,
  commentRouter,
  likeRouter,
  fuRouter,
  notificationRouter,
);

app.use('/uploads', express.static(path.join('./', envs.UPLOAD_DIR)));

app.use(globalErrors);

export function start() {
  con
    .initialize()
    .then(() => {
      console.log('Conexión a la base de datos exitosa');
      app.listen(envs.PORT, () => {
        console.log(chalk.blue(`🚀 -- Servidor corriendo en ${envs.URL}:${envs.PORT}`));
        console.log(chalk.green(`📝 -- Documentación disponible en ${envs.URL}:${envs.PORT}/api/docs`));
      });
    })
    .catch((err) => {
      console.error(err);
    });
}
