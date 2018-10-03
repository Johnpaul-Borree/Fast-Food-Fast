import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import path from 'path';
import requestRoutes from './routes/router';
import apiDocs from './docs/swaggerFood.json';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocs));
app.set('json spaces', 40);

app.use(express.static(path.join(__dirname)));
app.use('/styles', express.static(__dirname + '/views' + '/Resources' + '/css'));
app.use('/images', express.static(__dirname + '/views' + '/Resources' + '/images'));
app.use('/scripts', express.static(__dirname + '/views' + '/Resources' + '/js'));

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
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/#about', (req, res) => {
	res.sendFile(path.join(__dirname + '/views/index.html#about'));
});

app.get('/#services', (req, res) => {
	res.sendFile(path.join(__dirname + '/views/index.html#blog'));
});

app.get('/#contact', (req, res) => {
	res.sendFile(path.join(__dirname + '/views/index.html#contact'));
});

app.get('*', (req, res) => {
	res.status(404).json({ message: 'The requested Url was not found' });
});

requestRoutes(app);

const port = process.env.PORT || 3000;

app.listen(port);

export default app;
