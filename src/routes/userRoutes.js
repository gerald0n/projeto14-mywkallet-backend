import { Router } from 'express';
import { signIn, signUp } from '../controllers/userController.js';

const userRouter = Router();
userRouter.post('/cadastro', signUp)
userRouter.post('/', signIn)

export default userRouter;