import express from 'express';
import auth from '../middleware/auth.middleware.js';
import { createOrder, getOrder, listOrders, cancelOrder } from '../controllers/order.controller.js';
const router = express.Router();
router.post('/', auth, createOrder);
router.get('/', auth, listOrders);
router.get('/:order_id', auth, getOrder);
router.post('/:order_id/cancel', auth, cancelOrder);
export default router;
