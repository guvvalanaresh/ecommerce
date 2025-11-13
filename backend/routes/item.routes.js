import express from 'express';
import { getItem } from '../controllers/item.controller.js';
const router = express.Router();
router.get('/:item_id', getItem);
export default router;
