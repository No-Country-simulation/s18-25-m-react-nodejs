import { MiddlewareAuth0 } from '@/middlewares/Auth/MiddlewareAuth0';
import { Router } from 'express';
import { socialNetworkController } from './socialNetworksController';

const socialNetworksRouter = Router();

socialNetworksRouter.put('/social-networks/user/:userid', MiddlewareAuth0.CheckToken, socialNetworkController.update);

export default socialNetworksRouter;
