import Fastify, { LogController } from 'fastify';
import type { Config } from './config.js';

export function buildApp(config: Config) {
  const app = Fastify({
    logger: {
      level: config.LOG_LEVEL,
      redact: ['req.headers.authorization', 'req.headers.cookie', 'req.headers["x-hub-signature-256"]'],
    },
    // Webhook verification tokens arrive in the query string in Sprint 2.
    logController: new LogController({ disableRequestLogging: true }),
    bodyLimit: 1024 * 1024,
  });
  app.get('/health', async () => ({ status: 'ok', service: 'chatbot-whatsapp' }));
  return app;
}
