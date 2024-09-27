import { metricsHandler, metricsHook } from './routes/metrics.js';
import { usersHandler } from './routes/users.js';
import {createOrderHandler, deleteOrderHandler} from './routes/orders.js';
import { productsHandler } from './routes/products.js';
import Fastify from 'fastify';

const fastify = new Fastify();

fastify.addHook('onResponse', metricsHook);

fastify.get('/api/users', usersHandler);

fastify.post('/api/orders', createOrderHandler);
fastify.delete('/api/orders', deleteOrderHandler);

fastify.get('/api/products', productsHandler);

fastify.get('/metrics', metricsHandler);

fastify.listen({ port: parseInt(process.env.PORT, 10) || 3000, host: process.env.HOST || 'localhost' }, () => {
    console.log(`Server is running on http://localhost:3000`);
});