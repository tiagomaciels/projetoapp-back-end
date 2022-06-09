import { Router } from "express";

import { BookController } from "../controllers/BookController";

const routes = Router();

routes
  .get("/users/:user_id", new BookController().getAll)
  .post("/users/:user_id", new BookController().create);

routes
  .get("/:id", new BookController().getOne)
  .put("/:id", new BookController().update)
  .delete("/:id", new BookController().delete);

export { routes as booksRoutes };
