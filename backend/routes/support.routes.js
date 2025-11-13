import express from 'express';
import auth from '../middleware/auth.middleware.js';
import { createTicket } from '../controllers/support.controller.js';
const router = express.Router();
router.post('/tickets', auth, createTicket);
export default router;
