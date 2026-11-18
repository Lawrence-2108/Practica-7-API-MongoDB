# Práctica 7 — API de productos con MongoDB

**Lawrence Ortiz · 2025-1116**  
Programación Web — Full Stack · Docente Luis Soto

## Ejecutar en Windows

1. Abre PowerShell en esta carpeta. Instala las dependencias con `npm ci`.
2. Ejecuta `Copy-Item .env.example .env`. La plantilla usa MongoDB local en el puerto 27017. Si usas Atlas, coloca tu URI privada en `MONGODB_URI` y asegúrate de que la ruta de la URI apunte a `/tienda`. La base y la colección se crean al guardar el primer producto.
3. Enciende MongoDB Community si usas la conexión local. Ejecuta `npm start`. La consola debe indicar que se conectó a MongoDB y que la API está disponible.
4. Importa `Practica_7.postman_collection.json` en Postman. Ejecuta las solicitudes en orden. Los dos POST válidos guardan los identificadores automáticamente en variables de la colección.

## Guion para grabar el video

- «Soy Lawrence Ortiz, matrícula 2025-1116. Esta es mi API REST de productos. Express atiende las peticiones y Mongoose guarda los productos en la colección productos de la base tienda».
- Abre `models/Producto.js` y explica los tres campos obligatorios y el mínimo de cero para el precio. En `app.js` muestra la conexión por variable de entorno y las cinco rutas. Mantén cerrado el archivo `.env`.
- En Postman crea un producto para la prueba de persistencia. Luego sigue los pasos numerados de la colección. Muestra el código de estado y la respuesta de cada solicitud. En el paso 3 muestra tanto el listado como la consulta por ID. En el paso 4 señala el nuevo precio.
- Para el paso 8 detén Node con Ctrl+C, vuelve a ejecutar `npm start` y repite el listado. Consulta también el ID del producto de persistencia. Debe ser el mismo ID creado antes del reinicio.
- En Atlas o Compass abre `tienda → productos` y muestra ese mismo documento en la colección.

## Entrega

Sube el contenido de esta carpeta a un repositorio público de GitHub. Si usas Git, comprueba con `git status --short` que se excluyen `.env` y `node_modules`. Sube la grabación a YouTube con un enlace accesible para el docente. Completa los dos enlaces del TXT y sube únicamente ese TXT a Aula Virtual.
