import jwt from 'jsonwebtoken';

const verifyToken = (router) => {
	router.use((req, res, next) => {
		const token = req.body.token || req.query.token || req.headers['x-auth-token'];
		if (!token) {
			res.status(403).json({ message: 'No Token' });
		} else {
			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					res.status(401).json({ message: 'Failed to authenticate', err: 'Session expired' });
					return;
				}
				req.body.userId = decoded.userId;
				next();
			});
		}
	});
};

export default verifyToken;
