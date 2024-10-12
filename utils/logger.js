import pino from 'pino';
import * as rTracer from 'cls-rtracer';

export const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    useLevelLabels: true,
    timestamp: pino.stdTimeFunctions.isoTime,
    prettyPrint: process.env.NODE_ENV !== 'production',
    mixin() {
        return {
            reqId: rTracer.id(),
        };
    }
});