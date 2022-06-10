import { Router } from 'express';

import { PokeController } from './../controllers/PokeController';

const routes = Router();

routes
  .get("/:pokemon", new PokeController().getOne)
  
export { routes as pokeRoutes };
