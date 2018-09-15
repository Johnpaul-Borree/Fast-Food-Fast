import Joi from 'joi';
import orders from '../models/orders';

export const getAllOrders = (req, res) => {
	res.status(200).json({ status: 'Success', Orders: orders });
};

export const postOrder = (req, res) => {
	const { error } = validateOrders(req.body);
    
	if(error) return res.status(400)
		.json({ status: 'Failed to create order', message: error.details[0].message });

	const order = {
		id: orders.length + 1,
		type: req.body.type,
		name: req.body.name,
		orderDate: req.body.orderDate,
		expires: req.body.expires,
		quantities: req.body.quantities,
		unitPrice: Math.floor( Math.random() + 200),
		total: 'N' + req.body.quantities * (Math.floor( Math.random() + 200))
	};

	orders.push(order);

	res.json({ justAdded: order, message: 'order Created' });
};

function validateOrders(order) {
	const schema = {
		name: Joi.string().min(3).required(),
		type: Joi.string().min(3).required(),
		orderDate: Joi.string().min(6).required(),
		expires: Joi.string().min(6).required(),
		quantities: Joi.number().integer().min(1).max(50000).required(),
	};

	return Joi.validate(order, schema);
    
}
