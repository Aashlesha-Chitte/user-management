import { Router } from 'express';
import { UserRoutes, RoleRoutes, GenerateTokenRoutes } from './controller/index.js';

const router = Router();

router.get('/health-check', (req, res) => {
  res.send('I am OK');
});

router.use('/users', UserRoutes);
router.use('/roles', RoleRoutes);
router.use('/token', GenerateTokenRoutes);



export default router;
