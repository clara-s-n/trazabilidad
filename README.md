# Sistema de Trazabilidad Animal

Este repositorio contiene el proyecto del sistema de trazabilidad animal desarrollado en Node.js con Fastify. El sistema permite gestionar animales, predios, caravanas, transportes y eventos del ciclo de vida animal como pesajes, vacunaciones y ventas.

## 1. Propósito del sistema

Este sistema fue diseñado para ayudar a productores y entidades del rubro ganadero a registrar y consultar información clave del ciclo de vida de los animales, mejorando la trazabilidad y gestión operativa. Cada animal está vinculado a eventos, caravanas y predios, permitiendo una visión integral del historial de movimientos y controles.

## 2. Stack tecnológico (backend)

- **Node.js + Fastify** como framework web
- **TypeBox** para definir y validar esquemas
- **JWT** para autenticación basada en tokens
- **Swagger** para documentación automática
- **PostgreSQL** como base de datos relacional
- **pnpm/npm** como gestor de paquetes

## 3. Rutas del Backend y Endpoints

El backend expone una API REST organizada por entidad, con rutas agrupadas en subcarpetas de `/src/routes`. La documentación completa de cada endpoint, incluyendo parámetros, respuestas y descripciones, puede consultarse directamente en Swagger:

**→ http://localhost:3000/docs**

A continuación se presenta una vista general del árbol de endpoints:
```
/
├──/auth
   └── /login → POST - Login de usuario
├──/animals
   └── / → GET, POST
      ├── /animal_id/:animal_id → GET, PUT, DELETE
      ├── /animal_id/:animal_id/modifications → GET
      └── /animal_id/:animal_id/events → GET
         ├── /sale → GET, POST
         ├── /vaccine → GET, POST
         └── /weighing → GET, POST
├──/users
   └── / → GET, POST
      └── user_id/:user_id → GET, PUT, DELETE
├──/lands
   └── / → GET, POST
      ├── /land_id/:land_id → GET, PUT, DELETE
      └── /land_id/:land_id/animals → GET, PUT, DELETE
├──/tags
   └── / → GET, POST
      └── /tag_id/:tag_id → GET, PUT, DELETE
└──/transport
   └──/ → GET, POST
      └── /transport_id/:transport_id → GET, PUT, DELETE
```

## 4. Instalación y ejecución local

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repo>
   cd backend
   
2. Instalar dependencias y levantar el servidor:
   ```
   npm install
   npm run dev
   ```

3. Acceder a la documentación de Swagger:
   http://localhost:3000/docs
