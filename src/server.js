import express from 'express';
import requestRoutes from './routes/router';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('json spaces', 40);

app.get('/', (req, res) => {
  res.send('Welcome to Fast-Food-Fast');
});

app.use("/api/v1", requestRoutes);

const port = process.env.PORT || 3000;

app.listen(port);

export default app;