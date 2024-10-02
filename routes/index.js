import express from 'express';
import { getStats, getStatus } from '../controllers/AppController';
import { postNew } from '../controllers/UsersController';

const router = express.Router();

router.get('/status', getStatus);
router.get('/stats', getStats);

// #region Users routes
router.post('/users', postNew);
// #endregion

export default router;
