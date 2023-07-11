import { Router } from 'express';
import { addTransaction, getTransactions } from '../controllers/transactionController.js';

const transactionRouter = Router();

transactionRouter.post('/nova-transacao/:tipo', addTransaction)
transactionRouter.get('/home', getTransactions)

export default transactionRouter;