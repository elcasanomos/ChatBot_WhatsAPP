// Provider-neutral Chat Completions function contracts. Validate again server-side.
export const catalogTools = [
  {
    type: 'function',
    function: {
      name: 'buscar_producto',
      description: 'Busca productos activos. Devuelve id, SKU, nombre, precio decimal, moneda y stock actual. No reserva inventario.',
      strict: true,
      parameters: {
        type: 'object', additionalProperties: false,
        properties: {
          query: { type: 'string', description: 'Nombre, SKU o características solicitadas.' },
          category: { type: ['string', 'null'] },
          limit: { type: 'integer', enum: [1, 3, 5] },
        },
        required: ['query', 'category', 'limit'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'verificar_stock',
      description: 'Consulta precio y disponibilidad actual por SKU exacto. No garantiza disponibilidad futura ni reserva unidades.',
      strict: true,
      parameters: {
        type: 'object', additionalProperties: false,
        properties: { sku: { type: 'string' } }, required: ['sku'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'consultar_faq',
      description: 'Busca políticas aprobadas de envío, pago, cambios y atención. Si no existe información, no inventa una política.',
      strict: true,
      parameters: {
        type: 'object', additionalProperties: false,
        properties: { query: { type: 'string' } }, required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'derivar_humano',
      description: 'Registra una solicitud de atención humana y pausa las respuestas automáticas de la conversación actual. No afirma que un agente esté conectado.',
      strict: true,
      parameters: {
        type: 'object', additionalProperties: false,
        properties: { reason: { type: 'string' } }, required: ['reason'],
      },
    },
  },
] as const;
