import express from 'express';
import verifyToken from '../helpers/middleware/authorize';
import Orders from '../models/order';

const router = express.Router();

const order = new Orders();

verifyToken(router);
/**
 * User can post order fom this controller action
 */
router.post('/orders', (req, res) => {
	order.userId = req.body.userId;
	// order.checkOrderExistBefore({
	// 	userId: order.userId,
	// 	orderId: order.orderId
	// })
	// 	.then((orderExists) => {
	// 		if(!orderExists) {
	// order.fetchPrice(req.body.item)
	// 	.then((itemFound) => {
	// 		if(itemFound){
	// 			const price = itemFound.price;
	order.postOrder ({
		userId: order.userId,
		address: req.body.address,
		// quantity: req.body.quantity,
		// price: price,
		total: order.calculateTotal(req.body.items),
		// item: req.body.item
	}, req.body.items)
		.then((result) => {
			if(result) {
        console.log(result)
				res.status(200).json({  status: 'Success', message: 'Order created successfully' });
			}
		})
		.catch(() => {
			res.status(500).json({ status: 'failed', message: 'Problem adding order' });
		});
	// 	}
	// 	else {
	// 		res.status(404).json({ status: 'failed', message: 'We do not have this item', item: req.body.item });
	// 	}
	// });
	// 	}
	// 	else {
	// 		res.status(403).json({ status: 'failed', message: 'order exist', order: orderExists.item });
	// 	}
	// });
});

/**
 * Get a logged in user orders
 */

router.get('/users/:userId/orders', (req, res) => {
	order.userId = req.body.userId;
	req.params.userId = order.userId;
	order.getOrderByUserId(order.userId)
		.then((result) => {
			if(result){
				const userOrders = result;
				res.status(200).json({  status: 'Success', message: 'Orders fetched successfully', userOrders });
			}
			else {
				res.status(404).json({ status: 'failed', message: 'You have not made any order yet' });
			}
		})
		.catch(() => {
			res.status(500).json({ status: 'failed', message: 'Problem fetching order' });
		});
});

/**
 * Admin GET all orders
 */
router.get('/orders', (req, res) => {
	order.userId = req.body.userId;
	order.admin = req.body.admin;
	if(order.admin) {
		order.getAllOrders()
			.then((result) => {
				if(result){
					const allOrders = result;
					res.status(200).json({  status: 'Success', message: 'Orders fetched successfully', allOrders });
				}
				else {
					res.status(404).json({ status: 'failed', message: 'No orders yet we are starting' });
				}
			})
			.catch(() => {
				res.status(500).json({ status: 'failed', message: 'Problem fetching orders' });
			});
	}
	else {
		res.status(401).json({ status: 'failed', message: 'access denied, contact admin' });
	}
});

/**
 * Admin GET specific order
 */
router.get('/orders/:orderId', (req, res) => {
	order.userId = req.body.userId;
	order.admin = req.body.admin;
	if(order.admin) {
		order.getSpecificOrder(req.params.orderId)
			.then((result) => {
				if(result){
					const singleOrder = result;
					res.status(200).json({  status: 'Success', message: 'Order fetched successfully', singleOrder });
				}
				else {
					res.status(404).json({ status: 'failed', message: 'Order with the given Id was not found' });
				}
			})
			.catch(() => {
				res.status(500).json({ status: 'failed', message: 'Problem fetching order' });
			});
	}
	else {
		res.status(401).json({ status: 'failed', message: 'access denied, contact admin' });
	}
});

/**
 * Admin Update Order by orderId
 */

router.put('/orders/:orderId', (req, res) => {
	order.userId = req.body.userId;
	order.admin = req.body.admin;
	if(order.admin) {
		order.updateOrders(req.body.status, req.params.orderId)
			.then((result) => {
				if(result.rows[0]){
					const justUpdated = result.rows[0];
					justUpdated.updated_at = new Date().toLocaleString();
					res.status(200).json({  status: 'Success', message: 'Order updated successfully', justUpdated });
				}
				else {
					res.status(404).json({ status: 'failed', message: 'Order with the given Id was not found' });
				}
			})
			.catch(() => {
				res.status(500).json({ status: 'failed', message: 'Problem updating order' });
			});
	}
	else {
		res.status(401).json({ status: 'failed', message: 'access denied, contact admin' });
	}
});

export default router;
