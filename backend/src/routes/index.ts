import { Router } from 'express';
import advocateRoutes from './advocate.routes';

const router = Router();

router.use('/advocates', advocateRoutes);

export default router;
