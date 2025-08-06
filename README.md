# 🐄 Sistema de Trazabilidad Animal

> Sistema integral de trazabilidad para gestión ganadera con registro completo del ciclo de vida animal

Este sistema permite a productores y entidades ganaderas registrar y consultar información crítica del ciclo de vida de los animales, mejorando la trazabilidad y gestión operativa. Proporciona seguimiento completo desde el nacimiento hasta la venta, incluyendo eventos sanitarios, movimientos entre predios y cambios de caravanas.

## ✨ Características Principales

- 🔐 **Autenticación JWT** con roles jerárquicos (Operador, Consulta, Admin)
- 🐮 **Gestión completa de animales** con historial de cambios auditado
- 🏞️ **Administración de predios** con geolocalización y capacidad
- 🚛 **Seguimiento de transportes** entre ubicaciones
- 💉 **Registro de eventos sanitarios** (vacunaciones, pesajes, ventas)
- 🏷️ **Control de caravanas** con historial de asignaciones
- 📊 **API REST completa** con documentación Swagger automática
- 📱 **Interfaz web responsiva** desarrollada con Angular + Ionic
- 🔄 **Actualizaciones en tiempo real** vía WebSocket

## 📋 Tabla de Contenidos

- [Inicio Rápido](#-inicio-rápido)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura)
- [API Endpoints](#-api-endpoints)
- [Configuración Local](#-configuración-local)
- [Configuración Avanzada](#-configuración-avanzada)
- [Frontend (Angular/Ionic)](#-frontend-angularionic)
- [Datos de Prueba](#-datos-de-prueba)
- [Desarrollo](#-desarrollo)
- [Contribución](#-contribución)

## 🚀 Inicio Rápido

### Prerrequisitos

- Docker y Docker Compose
- Node.js 18+ (para desarrollo local)
- PostgreSQL 13+ (si no usas Docker)

### Ejecutar con Docker (recomendado)

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd trazabilidad

# 2. Copiar variables de entorno
cp .env.example .env

# 3. Levantar el stack completo
docker-compose up --build

# 4. Acceder a las aplicaciones
# Backend API + Swagger: http://localhost/docs/
# Frontend Web: http://localhost/
```

> ⚠️ **Primera ejecución**: La base de datos se inicializa automáticamente con estructura y datos base. Esto puede tomar unos minutos.

## 🛠 Stack Tecnológico

### Backend

- **Node.js + Fastify** - Framework web rápido y eficiente
- **TypeScript** - Tipado estático para mejor desarrollo
- **TypeBox** - Validación de esquemas y documentación automática
- **JWT** - Autenticación basada en tokens
- **PostgreSQL** - Base de datos relacional con triggers de auditoría
- **WebSocket** - Actualizaciones en tiempo real
- **Swagger/OpenAPI** - Documentación automática de API

### Frontend

- **Angular 16+** - Framework web moderno
- **Ionic** - Componentes UI responsivos
- **TypeScript** - Desarrollo consistente con el backend
- **Angular Guards** - Protección de rutas por roles

### DevOps & Tools

- **Docker + Docker Compose** - Entorno de desarrollo consistente
- **pnpm/npm** - Gestión de dependencias
- **ESLint + Prettier** - Calidad y formato de código

## 🏗 Arquitectura

### Estructura del Proyecto

```
trazabilidad/
├── backend/                    # API REST con Fastify
│   ├── src/
│   │   ├── routes/            # Endpoints organizados por entidad
│   │   ├── services/          # Repositorios y lógica de negocio
│   │   ├── types/schemas/     # Definiciones TypeBox
│   │   ├── plugins/           # Plugins Fastify (auth, swagger, etc)
│   │   └── database/          # Conexión y utilidades DB
│   └── public/                # Archivos estáticos (imágenes)
├── frontend/                   # Aplicación Angular + Ionic
│   ├── src/app/
│   │   ├── pages/             # Páginas de la aplicación
│   │   ├── guards/            # Protección de rutas
│   │   ├── services/          # Servicios HTTP y estado
│   │   └── shared/            # Componentes reutilizables
│   └── ...
├── database/                   # Scripts SQL de inicialización
└── docker-compose.yml         # Orquestación de servicios
```

### Patrones de Diseño

- **Repository Pattern** - Abstracción de acceso a datos
- **Role-Based Access Control** - Autorización por niveles
- **Auto-loading Routes** - Organización modular de endpoints
- **Schema-First Development** - TypeBox para contratos de API

## 📡 API Endpoints

El backend expone una API REST organizada por entidad, con rutas agrupadas en subcarpetas de `/src/routes`. La documentación completa de cada endpoint, incluyendo parámetros, respuestas y descripciones, puede consultarse directamente en Swagger:

**→ http://localhost/backend/docs**

A continuación se presenta una vista general del árbol de endpoints:

```
/
├──/auth
   └── /login → POST - Login de usuario
├──/animals
   └── / → GET, POST
      ├── /:animal_id → GET, PUT, DELETE
      ├── /:animal_id/modifications → GET
      └── /:animal_id/events → GET
         ├── /sale/:animal_id → GET, POST
         ├── /vaccine/:animal_id → GET, POST
         └── /weighing/:animal_id → GET, POST
├──/users
   └── / → GET, POST
      └── user_id/:user_id → GET, PUT, DELETE
├──/lands
   └── / → GET, POST
      ├── /land_id/:land_id → GET, PUT
      └── /land_id/:land_id/animals → GET
├──/tags
   └── / → GET
      └── /tag_id/:tag_id → GET, PUT
└──/transport
   └──/ → GET, POST
      └── /transport_id/:transport_id → GET, PUT, DELETE
```

## ⚙️ Configuración Local

```
/
├──/auth
   └── /login → POST - Login de usuario
├──/animals
   └── / → GET, POST
      ├── /:animal_id → GET, PUT, DELETE
      ├── /:animal_id/modifications → GET
      └── /:animal_id/events → GET
         ├── /sale/:animal_id → GET, POST
         ├── /vaccine/:animal_id → GET, POST
         └── /weighing/:animal_id → GET, POST
├──/users
   └── / → GET, POST
      └── user_id/:user_id → GET, PUT, DELETE
├──/lands
   └── / → GET, POST
      ├── /land_id/:land_id → GET, PUT
      └── /land_id/:land_id/animals → GET
├──/tags
   └── / → GET
      └── /tag_id/:tag_id → GET, PUT
└──/transport
   └──/ → GET, POST
      └── /transport_id/:transport_id → GET, PUT, DELETE
```

## 4. Ejecución con Docker (recomendado)

### 🐳 Requisitos previos

- Tener instalado **Docker** y **Docker Compose**

### 🛠️ Paso a paso

1. Clonar el repositorio:

   ```bash
   git clone <url-del-repo>
   cd backend

   ```

2. Crear un archivo .env en la raíz del backend con las siguientes variables:

   ```
   DB_HOST=db
   DB_PORT=5432
   DB_USER=postgres
   DB_PASSWORD=postgres
   DB_NAME=trazabilidad
   FASTIFY_SECRET=supersecreto
   ```

3. Levantar el entorno completo con:

   ```
   docker-compose up --build
   ```

4. Esperar un tiempo y luego ingresar a:
   http://localhost:3000/docs

> [!IMPORTANT]
> ⚠️ La base de datos se inicializa automáticamente con estructura y datos base al ejecutar los contenedores por primera vez. Los scripts .sql están en: `src/database/scripts/`

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto con:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=trazabilidad

# Backend
FASTIFY_SECRET=tu-secreto-jwt-aqui
PORT=3000

# Frontend
API_URL=http://localhost:3000
```

### Desarrollo sin Docker

#### Backend

```bash
cd backend
npm install
npm run dev  # TypeScript watch mode + nodemon
npm test     # Run test suite with coverage
npm run build:ts  # Compile TypeScript only
```

#### Frontend

```bash
cd frontend
npm install
npm start    # Angular development server
npm run build  # Production build
```

#### Base de datos

```bash
# Conectar a PostgreSQL
psql -h localhost -p 5432 -U postgres -d trazabilidad

# Ejecutar scripts de inicialización
psql -f database/scripts/01-init.sql
```

## 🧪 Configuración Avanzada

### Configuración de Base de Datos

El sistema incluye:

- **Triggers de auditoría** automáticos para todas las tablas
- **Índices optimizados** para consultas frecuentes
- **Constraints de integridad** referencial
- **Funciones stored procedures** para lógica compleja

### Configuración de Autenticación

Sistema de roles jerárquicos:

1. **Administrador** - Acceso completo al sistema
2. **Operador** - Crear/editar datos ganaderos
3. **Consulta** - Solo lectura de información

### WebSocket en Tiempo Real

El backend notifica automáticamente cambios a clientes conectados:

```javascript
// Ejemplo de actualización automática
fastify.websocketServer.clients.forEach((client) => {
  client.send("animals"); // Notifica cambios en animales
});
```

## 📱 Frontend (Angular/Ionic)

> [!WARNING]
> El sistema cuenta con una interfaz web desarrollada con Angular e Ionic. A continuación se listan todas las rutas del frontend disponibles. Estas páginas pueden ser accedidas directamente **modificando la URL en el navegador**, por ejemplo: `http://localhost:4200/animal/list`.

> **Nota**: Por defecto la aplicación redirigirá a la pantalla de login.

### 🔐 Autenticación (`/auth`)

- `/auth/login` – Página de inicio de sesión.
- `/auth/logout` – Cierre de sesión.
- `/auth/register` – Registro de nuevo usuario.

### 👤 Usuarios (`/user`)

- `/user/list` – Listado de usuarios.
- `/user/create` – Alta de nuevo usuario.
- `/user/:id/delete` – Eliminación de un usuario específico.
- `/user/:id/profile` – Visualización del perfil del usuario con ID `:id`.

### 🐄 Animales (`/animal`)

- `/animal/list` – Listado de animales registrados.
- `/animal/create` – Alta de nuevo animal.
- `/animal/:id` – Detalles del animal con ID `:id`.
- `/animal/:id/edit` – Edición del animal con ID `:id`.
- `/animal/:id/events` – Eventos asociados al animal (pesajes, vacunas, ventas, etc.).
- `/animal/:id/history` – Historial de cambios del animal.
- `/animal/:id/movements` – Historial de movimientos geográficos del animal.

### 🌾 Predios (`/land`)

- `/land/list` – Listado de predios registrados.
- `/land/create` – Alta de nuevo predio.
- `/land/:id` – Detalles del predio con ID `:id`.

### 📅 Eventos (`/evento`)

- `/event/pesaje/create` – Registrar nuevo evento de pesaje.
- `/event/vacunacion/create` – Registrar nuevo evento de vacunación.
- `/event/venta/create` – Registrar nuevo evento de venta.
- `/event/transporte/create` – Registrar nuevo evento de transporte.

## 🔐 Datos de Prueba

Para probar el sistema, utiliza las siguientes credenciales predefinidas:

### Credenciales de Prueba

#### Administrador (acceso completo)

```
Email: admin@trazabilidad.uy
Contraseña: admin123
```

#### Operador (crear/editar datos)

```
Email: operador@mgap.gub.uy
Contraseña: opera123
```

#### Usuario Consulta (solo lectura)

```
Email: estanciero@hotmail.com
Contraseña: estancia123
```

### IDs de Prueba

- **Usuario ID de ejemplo**: `0c2bcc02-7a08-47be-9c79-28f17117d8fa`

> 💡 **Tip**: Para acceder a la creación de usuarios, debes estar autenticado como administrador.

## 🔧 Desarrollo

### Scripts Disponibles

#### Backend

```bash
npm run dev         # Desarrollo con hot reload
npm run build:ts    # Compilar TypeScript
npm test           # Ejecutar tests con coverage
npm run lint       # Verificar código con ESLint
npm start          # Producción
```

#### Frontend

```bash
npm start          # Servidor de desarrollo Angular
npm run build      # Build de producción
npm run test       # Ejecutar tests unitarios
npm run e2e        # Tests end-to-end
```

### Estructura de Desarrollo

#### Flujo de Autenticación

1. Usuario hace login → `POST /auth/login`
2. Backend valida credenciales y retorna JWT
3. Frontend almacena token y lo incluye en headers
4. Guards protegen rutas según roles

#### Patrón Repository

```typescript
// Ejemplo de uso del patrón repository
const animalRepo = new AnimalRepository();
const animals = await animalRepo.findByLandId(landId);
```

#### WebSocket Real-time

```typescript
// Backend notifica cambios
fastify.websocketServer.clients.forEach((client) => {
  client.send(
    JSON.stringify({
      type: "animals",
      action: "updated",
    })
  );
});
```

### Base de Datos

#### Conectar manualmente

```bash
# Via Docker
docker exec -it database psql -U postgres -d trazabilidad

# Local
psql -h localhost -p 5436 -U postgres -d trazabilidad
```

#### Estructura de Auditoría

- Todas las tablas tienen triggers automáticos
- Cambios se guardan en tablas `*_history`
- Incluye timestamp y usuario que hizo el cambio

## 🤝 Contribución

### Guías de Desarrollo

1. **TypeScript estricto** - Sin `any`, tipado completo
2. **TypeBox schemas** - Validación en tiempo de ejecución
3. **Repository pattern** - Abstracción de acceso a datos
4. **Role-based auth** - Verificar permisos en cada endpoint

### Workflow de Contribución

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Convenciones de Código

- **Backend**: Fastify plugins, TypeBox schemas, Repository pattern
- **Frontend**: Angular/Ionic components, reactive forms, guards
- **Database**: PostgreSQL con triggers de auditoría

---

**Desarrollado con ❤️ para la gestión ganadera moderna**
