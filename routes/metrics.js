import promClient from 'prom-client';

export const metricsHandler = async (req, res) => {
    res.set('Content-Type', registry.contentType);
    res.end(await registry.metrics());
}

// Регистрируем реестр метрик для Prometheus
const registry = new promClient.Registry();

// Создаём метрику для времени ответа на запросы
const httpRequestDurationSeconds = new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'endpoint', 'status_code'],
    registers: [registry],
});

export const metricsMiddleware = (req, res, next) => {
    const end = httpRequestDurationSeconds.startTimer();

    res.on('finish', () => {
        end({ method: req.method, endpoint: req.path, status_code: res.statusCode });
    });

    next();
}