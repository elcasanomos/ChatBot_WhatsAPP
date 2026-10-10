# Agente de WhatsApp para catálogo

Entregables del Sprint 0:

- `src/db/schema.ts`: esquema inicial para PostgreSQL y Drizzle.
- `src/agent/tools.ts`: cuatro contratos de herramientas del agente.
- `data/products.seed.json`: 20 productos ficticios, incluidos dos agotados.
- `docs/sprint-0.md`: casos de uso, relaciones, criterios de aceptación y decisiones de persistencia.

La base local del Sprint 1 incluye un servidor Fastify con `/health`. Las conexiones reales a Meta, Azure y PostgreSQL siguen pendientes. El compilador incluye el esquema Drizzle del Sprint 0.

## Ejecución local

Requiere Node.js 22 o posterior. En PowerShell:

```powershell
npm ci
Copy-Item .env.example .env
npm run dev
```

En otra terminal: `Invoke-RestMethod http://127.0.0.1:3000/health`.
El endpoint comprueba el proceso HTTP, no los proveedores externos.

## Verificación y compilación

```powershell
npm run typecheck
npm test
npm run build
npm start
```

La guía de cuentas y recursos está en `docs/sprint-1.md`. `.env` se excluye de Git. Los endpoints `/webhook`, la persistencia y el envío de mensajes se implementarán en el Sprint 2.
