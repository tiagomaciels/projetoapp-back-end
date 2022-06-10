import { Router } from 'express';

import { AuthController } from '../controllers/AuthController';
import { authRoutes } from './AuthRoutes';
import { booksRoutes } from './BooksRoutes';
import { pokeRoutes } from './PokeRoutes';
import { registerRoutes } from './RegisterRoutes';
import { usersRoutes } from './UsersRoutes';

const routes = Router();

routes.use("/users", new AuthController().protectedRoute, usersRoutes);
routes.use("/books", new AuthController().protectedRoute, booksRoutes);
routes.use("/pokemon", new AuthController().protectedRoute, pokeRoutes);
routes.use("/auth", authRoutes);
routes.use("/register", registerRoutes);

export { routes };
