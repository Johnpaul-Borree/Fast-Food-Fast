import express from 'express';
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

import { postOrder, getAllOrders, fetchSingleOrder, updateOrders } from '../controller/ordersControllers';

//Post /api/v1/orders
router.post('/orders', postOrder);

//GET /api/v1/orders
router.get('/orders', getAllOrders);

//GET /api/v1/orders/<orderId>
router.get('/orders/:orderId', fetchSingleOrder);

//PUT /api/v1/orders/<orderId>
router.put('/orders/:orderId', updateOrders);

export default router;

export default router;

