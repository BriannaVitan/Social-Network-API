import { Router } from 'express';
import userRoutes from './thoughtRoutes.js';
import  thoughtRoutes from './userRoutes.js';

const router = Router();

router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

export default router;
