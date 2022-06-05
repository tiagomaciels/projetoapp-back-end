import { Router } from 'express';

import { UserController } from './../controllers/UserController';

const routes = Router();

routes.get("", new UserController().getAll);

routes
  .get("/:id", new UserController().getOne)
  .put("/:id", new UserController().update)
  .delete("/:id", new UserController().delete);

export { routes as usersRoutes };
