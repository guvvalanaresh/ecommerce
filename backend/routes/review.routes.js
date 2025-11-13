import express from 'express';
import auth from '../middleware/auth.middleware.js';
import { postReview, listReviews } from '../controllers/review.controller.js';
const router = express.Router();
router.post('/:restaurant_id/reviews', auth, postReview);
router.get('/:restaurant_id/reviews', listReviews);
export default router;
