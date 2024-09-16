import { metricsHandler, metricsHook } from './routes/metrics.js';
import { usersHandler } from './routes/users.js';
import { ordersHandler } from './routes/orders.js';
import { productsHandler } from './routes/products.js';
import Fastify from 'fastify';

const fastify = new Fastify();

fastify.addHook('onResponse', metricsHook);

fastify.get('/api/users', usersHandler);

fastify.post('/api/orders', ordersHandler);

fastify.get('/api/products', productsHandler);

fastify.get('/metrics', metricsHandler);

fastify.listen({ port: 3000, host: '0.0.0.0' }, () => {
    console.log(`Server is running on http://localhost:3000`);
});