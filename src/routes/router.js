import express from 'express';
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

import { postOrder, getAllOrders } from '../controller/ordersControllers';

//Post /api/v1/orders
router.post('/orders', postOrder);

//GET /api/v1/orders
router.get('/orders', getAllOrders);

export default router;
