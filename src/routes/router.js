import userController from '../controllers/userController';
import foodMenu from '../controllers/menuController';
import orderController from '../controllers/ordersController';

const router = (app) => {
	app.use('/api/v1/auth', userController);
	app.use('/api/v1', foodMenu);
	app.use('/api/v1', orderController);
};

export default router;
