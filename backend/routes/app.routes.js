import express from 'express';
import { getAppConfig } from '../controllers/app.controller.js';
const router = express.Router();
router.get('/config', getAppConfig);
export default router;
