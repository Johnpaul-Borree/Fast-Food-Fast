import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import requestRoutes from './routes/router';
import apiDocs from './docs/swaggerFood.json';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocs));
app.set('json spaces', 40);

app.get('/', (req, res) => {
	res.send('Welcome to Fast-Food-Fast');
});

requestRoutes(app);

const port = process.env.PORT || 3000;

app.listen(port);

export default app;
