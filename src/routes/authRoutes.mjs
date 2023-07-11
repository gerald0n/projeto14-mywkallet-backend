import { Router } from 'express';
import { authSession } from '../controllers/authController.mjs';

const authRouter = Router()
authRouter.get('/session', authSession)

export default authRouter;