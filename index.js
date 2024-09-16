import express from 'express';
import { metricsHandler, metricsMiddleware } from './routes/metrics.js';
import { usersHandler } from './routes/users.js';
import { ordersHandler } from './routes/orders.js';
import { productsHandler } from './routes/products.js';

const app = express();

app.use(express.json());
app.use(/^(?!\/metrics$).*/, metricsMiddleware);

app.get('/api/users', usersHandler);

app.post('/api/orders', ordersHandler);

app.get('/api/products', productsHandler);

app.get('/metrics', metricsHandler);

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});