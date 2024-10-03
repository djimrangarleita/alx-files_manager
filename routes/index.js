import express from 'express';
import { getStats, getStatus } from '../controllers/AppController';
import { getConnect, getDisconnect } from '../controllers/AuthController';
import { getMe, postNew } from '../controllers/UsersController';
import parseAuthCredentials from '../middlewares/parseAuthCredentials';
import requireAuth from '../middlewares/requireAuth';

const router = express.Router();

router.get('/status', getStatus);
router.get('/stats', getStats);

// #region Users routes
router.post('/users', postNew);
router.get('/users/me', requireAuth, getMe);
// #endregion

// #region Auth routes
router.get('/connect', parseAuthCredentials, getConnect);
router.get('/disconnect', requireAuth, getDisconnect);
// #endregion Auth routes

export default router;
