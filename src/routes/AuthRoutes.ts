import 'dotenv/config';

import { Router } from 'express';

import { AuthController } from '../controllers/AuthController';

const router = Router();

router.post("/", new AuthController().auth);

export { router as authRoutes };
