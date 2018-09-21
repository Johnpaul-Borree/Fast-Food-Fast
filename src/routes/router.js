import userController from '../controllers/userController';

const router = (app) => {
	app.use('/api/v1/auth', userController);
};

export default router;
