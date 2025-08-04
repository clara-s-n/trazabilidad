# Copilot Instructions for Animal Traceability System

## Architecture Overview

This is a full-stack animal traceability system with:

- **Backend**: Node.js + Fastify REST API with PostgreSQL
- **Frontend**: Angular + Ionic hybrid app
- **Database**: PostgreSQL with audit triggers and history tracking
- **Deployment**: Docker Compose with nginx proxy

### Core Domain

The system tracks cattle through their lifecycle with entities: `animals`, `lands` (farms), `tags` (electronic ear tags), `events` (weighings, vaccinations, sales), `transports` (movements), and `users` with role-based access.

## Key Patterns & Conventions

### Backend (Fastify)

- **Route Organization**: Use folder-based auto-loading (`/src/routes/animals/index.ts`, `/src/routes/animals/weighings/index.ts`)
- **TypeBox Schemas**: All API contracts defined with TypeBox in `/src/types/schemas/` with examples for Swagger
- **Repository Pattern**: Database access via repositories (`animalRepository.getByIdDetailed()`)
- **JWT Authentication**: Use decorators `fastify.authenticate`, `fastify.verifyAdmin`, `fastify.verifyOperator`, `fastify.verifyOperatorOrAdmin`
- **Role-based Authorization**: 3 roles - Admin (role_id=3), Operator (role_id=1), Consulta (role_id=2)
- **Event-driven**: Animal events (weighings, vaccinations, sales) link to a central `events` table

### Frontend (Angular/Ionic)

- **Standalone Components**: All components use `standalone: true` pattern with explicit imports
- **Route Guards**: Role-based guards (`adminGuard`, `operatorGuard`, `adminOrOperatorGuard`, `userGuard`)
- **Signal-based State**: Use Angular signals (`signal()`, `computed()`, `effect()`) for reactive forms and state
- **Service Injection**: Use `inject()` function in components: `private service = inject(ServiceName)`
- **Component Patterns**: Form components use signal-based validation with `touched` and `loading` states

### Database Patterns

- **UUID Primary Keys**: All entities use UUID primary keys
- **Audit Tables**: Automatic history tracking (e.g., `animal_history` table with triggers)
- **Enum Types**: PostgreSQL enums for status fields (`animal_status`, `tag_status`)

## Development Workflows

### Running the System

```bash
# Full stack with Docker
docker-compose up --build

# Backend only (development with watch mode)
cd backend && npm run dev  # TypeScript watch + node --watch

# Backend testing
cd backend && npm test  # Node.js test runner with coverage

# Frontend only
cd frontend && npm start  # ng serve with allowed hosts

# Production build
cd backend && npm run build:ts
cd frontend && npm run build
```

### API Documentation

- Swagger UI: `http://localhost:3000/docs`
- All endpoints have comprehensive TypeBox schemas with examples

### Authentication Testing

Use these credentials for API testing:

- Admin: `administrador@example.com` / `admin123`
- Operator: `operador@example.com` / `operador123`
- Consulta: `consulta@example.com` / `consulta123`

## Critical Implementation Details

### Event Creation Pattern

When creating animal events (weighing, vaccination, sale):

1. Create event in `events` table with `event_type`
2. Link to animal via `animal_event` junction table
3. Create specific record (weighing, vaccination, sale) with `event_id`

### WebSocket Integration

- Real-time updates for land creation using WebSocket broadcasting
- Pattern: `fastify.websocketServer.clients.forEach()` for broadcasting
- Frontend connects via WebSocket for live updates (e.g., land creation notifications)

### Frontend Form Patterns

- Signal-based forms with reactive validation: `formValid = computed(() => ...)`
- Manual touched state tracking: `touched = signal({ field: false })`
- Use `effect()` for input population from props: `effect(() => { if (input()) ... })`

### Schema Validation

- Use TypeBox `Type.Object()` with examples for API schemas
- Separate schemas for creation (`CreateAnimalSchema`) vs response (`AnimalSchema`)
- Always include security schemas: `security: [{ bearerAuth: [] }]`

### Route Registration

- Routes auto-loaded from folder structure via `@fastify/autoload`
- Use `FastifyPluginAsync` for route modules
- Nested routes: `/animals/:animal_id/weighings` maps to `/routes/animals/weighings/index.ts`

### Error Handling

Custom error classes in `/utils/index.ts`:

- `UCUErrorNotFound` for 404s
- `UCUErrorUnauthorized` for 401s
- `UCUErrorBadRequest` for 400s

## Project-Specific Gotchas

- **TypeScript ESM**: Backend uses ES modules (`.js` imports even for `.ts` files)
- **Role ID Mapping**: Admin=3, Operator=1, Consulta=2 (non-sequential!)
- **Database Connection**: Uses `pg` Pool singleton in `database.ts`
- **Frontend Routes**: Complex nested routing with lazy loading and guards
- **CORS**: Handled by nginx proxy, not Fastify directly
- **Environment Variables**: Backend reads from Docker env, requires `FASTIFY_SECRET` for JWT
- **Testing**: Backend uses Node.js built-in test runner with ESM modules

## Essential File Locations

- API Schemas: `/backend/src/types/schemas/`
- Route Handlers: `/backend/src/routes/`
- Database Scripts: `/database/scripts/` (auto-run on container startup)
- Frontend Services: `/frontend/src/app/services/`
- Route Guards: `/frontend/src/app/guards/`
