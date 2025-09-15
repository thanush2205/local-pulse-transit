import { Router } from 'express';
import { getBuses, getAdminDashboardData } from '../controllers/dataController';

const router = Router();

router.get('/buses', getBuses);
router.get('/dashboard', getAdminDashboardData);

export default router;