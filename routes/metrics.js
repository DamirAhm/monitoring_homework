import promClient from 'prom-client';

export const metricsHandler = async (req, rep) => {
    rep.send(await registry.metrics());
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

export const metricsHook = (req, rep) => {
    httpRequestDurationSeconds.observe( { method: req.method, endpoint: req.routeOptions.url, status_code: rep.statusCode }, rep.elapsedTime / 1000);
}