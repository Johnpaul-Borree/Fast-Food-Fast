import express from 'express';
import verifyToken from '../helpers/middleware/authorize';
import Menu from '../models/menu';

const router = express.Router();

const menu = new Menu();

verifyToken(router);
/**
 * Admin create menu
 */
router.post('/menu', (req, res) => {
	menu.userId = req.body.userId;
	menu.admin = req.body.admin;

	if (menu.admin ) {
		menu.addMenu({
			productName: req.body.productName,
			description: req.body.description,
			price: req.body.price,
		})
			.then((result) => {
				const menuEntry = result.rows[0];
				menuEntry.created_at = new Date(menuEntry.created_at).toDateString();
				res.status(200).json({ status: 'success', message: 'Created', menuEntry });
			})
			.catch(() => {
				res.status(500).json({ status: 'failed', message: 'Problem adding menu' });
			});
	} else {
		res.status(401).json({ status: 'failed', message: 'access denied, contact admin' });
	}
});


export default router;
