import userController from '../controllers/userController';
import foodMenu from '../controllers/menuController';

const router = (app) => {
	app.use('/api/v1/auth', userController);
	app.use('/api/v1', foodMenu);
};

export default router;
