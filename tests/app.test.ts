import assert from 'node:assert/strict';
import test from 'node:test';
import { buildApp } from '../src/app.js';
import { readConfig } from '../src/config.js';

test('health funciona sin credenciales externas y el webhook no acepta eventos aún', async () => {
  const app = buildApp(readConfig({ LOG_LEVEL: 'silent' }));
  try {
    const response = await app.inject({ method: 'GET', url: '/health' });
    assert.equal(response.statusCode, 200);
    assert.equal(response.json().status, 'ok');
    assert.equal((await app.inject({ method: 'POST', url: '/webhook', payload: {} })).statusCode, 404);
  } finally { await app.close(); }
});

test('rechaza puertos inválidos sin incluir secretos en el error', () => {
  for (const PORT of ['0', '65536', '3000.5', 'secret-value']) {
    assert.throws(() => readConfig({ PORT }), { message: 'Configuración inválida: PORT' });
  }
});
