import 'dotenv/config';
import { buildApp } from './app.js';
import { readConfig } from './config.js';

const config = readConfig();
const app = buildApp(config);
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => {
    void app.close().catch(() => { process.exitCode = 1; });
  });
}
try {
  await app.listen({ host: config.HOST, port: config.PORT });
} catch (error) {
  app.log.error(error, 'No se pudo iniciar el servidor');
  process.exitCode = 1;
  await app.close();
}
