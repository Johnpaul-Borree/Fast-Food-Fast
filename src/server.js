import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import requestRoutes from './routes/router';
import apiDocs from './docs/swaggerFood.json';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocs));
app.use(express.static('./public'));
app.set('json spaces', 40);

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, ' +
 'Authorization, Access-Control-Allow-Credentials'
	);
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});

requestRoutes(app);

app.get('/', (req, res) => {
	res.status(200).json({ message:'Welcome to Fast-Food-Fast' });
});

app.get('*', (req, res) => {
	res.status(404).json({ message: 'The requested Url was not found' });
});


const port = process.env.PORT || 3000;

app.listen(port);

export default app;
