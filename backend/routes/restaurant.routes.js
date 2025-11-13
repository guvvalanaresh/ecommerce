import express from 'express';
import { listRestaurants, getRestaurant, getMenu } from '../controllers/restaurant.controller.js';
const router = express.Router();
router.get('/', listRestaurants);
router.get('/:restaurant_id/summary', getRestaurant); // for brevity same handler
router.get('/:restaurant_id', getRestaurant);
router.get('/:restaurant_id/menu', getMenu);
export default router;
