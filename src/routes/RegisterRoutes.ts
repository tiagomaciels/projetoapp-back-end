import { Router } from 'express';

import { UserController } from './../controllers/UserController';

const routes = Router();

routes.post("/", new UserController().create);

export { routes as registerRoutes };
