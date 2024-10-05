import express from 'express';
import { getStats, getStatus } from '../controllers/AppController';
import { getConnect, getDisconnect } from '../controllers/AuthController';
import { postUpload } from '../controllers/FilesController';
import { getMe, postNew } from '../controllers/UsersController';
import parseAuthCredentials from '../middlewares/parseAuthCredentials';
import requireAuth from '../middlewares/requireAuth';

const router = express.Router();

router.get('/status', getStatus);
router.get('/stats', getStats);

router.post('/users', postNew);
router.get('/users/me', requireAuth, getMe);

router.get('/connect', parseAuthCredentials, getConnect);
router.get('/disconnect', requireAuth, getDisconnect);

router.post('/files', requireAuth, postUpload);

export default router;
