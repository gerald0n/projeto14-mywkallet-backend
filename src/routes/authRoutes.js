import { Router } from 'express';
import { authSession } from '../controllers/authController.js';

const authRouter = Router()
authRouter.get('/session', authSession)

export default authRouter;