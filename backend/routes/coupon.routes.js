import express from 'express';
import auth from '../middleware/auth.middleware.js';
import { listCoupons, claimCoupon } from '../controllers/coupon.controller.js';
const router = express.Router();
router.get('/', listCoupons);
router.post('/', auth, claimCoupon);
export default router;
