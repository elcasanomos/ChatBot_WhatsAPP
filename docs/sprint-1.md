# Sprint 1: entornos e infraestructura base

## Estado

- [x] Base Node.js, TypeScript y Fastify con dependencias bloqueadas.
- [x] Endpoint `/health`, configuración local y cierre ordenado.
- [x] Plantilla de variables y pruebas locales.
- [ ] App de Meta y envío de prueba de WhatsApp.
- [ ] Suscripción Azure y despliegue de modelo con consulta de prueba.
- [ ] ngrok configurado y acceso HTTPS comprobado.

El sprint no está completo hasta verificar los puntos externos. No se han creado recursos de nube ni hecho llamadas de pago.

## Meta

1. Entrar en https://developers.facebook.com/ y completar el registro de desarrollador.
2. Crear una app con el caso de uso/producto de WhatsApp ofrecido por el panel.
3. Abrir la configuración de pruebas de la API, seleccionar el número de prueba y añadir y verificar un destinatario.
4. Guardar el Phone Number ID en `WHATSAPP_PHONE_NUMBER_ID` y el token de prueba en `WHATSAPP_ACCESS_TOKEN` dentro de `.env`.
5. Guardar el secreto de la app en `META_APP_SECRET`. Es distinto del token de acceso.
6. Copiar la versión Graph API del ejemplo actual del panel en `META_GRAPH_API_VERSION`.
7. Usar el ejemplo del panel para enviar un mensaje al destinatario autorizado. El token temporal de prueba no es una credencial de producción.

Crear localmente un `META_VERIFY_TOKEN` aleatorio para el futuro handshake. No es un token emitido por Meta. El webhook todavía no puede registrarse: el handshake y las firmas se implementan en el Sprint 2.

Referencia: https://developers.facebook.com/docs/whatsapp/cloud-api/get-started. No se pudo recuperar automáticamente su contenido en esta sesión; confirmar los nombres y requisitos en el panel.

## Azure

1. Activar Azure for Students y comprobar en el portal la suscripción y los servicios permitidos. El crédito no garantiza acceso ni cuota para el modelo.
2. Seleccionar esa suscripción y crear un grupo de recursos, por ejemplo `rg-chatbot-dev`.
3. Buscar Azure OpenAI y revisar región, permisos y disponibilidad antes de crear el recurso. Si no está permitido, conservar el error sin claves para decidir una alternativa.
4. En Microsoft Foundry crear un despliegue de `gpt-4o-mini` si está disponible con cuota. Si no aparece, revisar opciones antes de cambiar el diseño.
5. Guardar endpoint, clave y nombre del despliegue en `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_API_KEY` y `AZURE_OPENAI_DEPLOYMENT`.
6. Probar una consulta breve en el playground y comprobar el consumo. El servidor local aún no hace inferencias.

Azure utiliza el nombre del despliegue en las llamadas; puede diferir del nombre del modelo. La guía citada describe Foundry clásico y el portal nuevo puede mostrar otra navegación. Revisar precios y condiciones de la oferta antes de probar; no elegir capacidad aprovisionada sin evaluar su costo.

Referencia: https://learn.microsoft.com/en-us/azure/foundry-classic/openai/how-to/create-resource

## Túnel local

1. Crear una cuenta en ngrok e instalar el agente desde el sitio oficial.
2. Seguir la autenticación indicada en su panel en la terminal local; no guardar el authtoken en Git.
3. Con `npm run dev` activo, ejecutar en otra terminal `ngrok http 3000`.
4. Abrir la URL HTTPS asignada con la ruta `/health` y comprobar `status: ok`.
5. Conservar la URL para el Sprint 2. La callback será `https://<dominio-asignado>/webhook` cuando exista el handshake.

El túnel expone el servidor local mientras esté activo; cerrarlo al terminar. No se ha instalado ni iniciado ngrok en esta sesión.

Referencia: https://ngrok.com/docs/start

## Cierre del sprint

Registrar sin secretos: envío de Meta exitoso, consulta de Azure exitosa y acceso HTTPS a `/health`. Después implementar el Sprint 2 con firmas y cola duradera antes de aceptar eventos reales.
