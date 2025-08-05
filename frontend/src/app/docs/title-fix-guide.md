# Fix: Dynamic Page Titles Implementation

## Problem

The page title remains "ionic app" and doesn't change when navigating between pages.

## Solution

Add the `Title` service directly to each component's `ngOnInit()` method.

## Pattern to Apply

For each page component, follow this pattern:

### 1. Add imports:

```typescript
import { Component, inject, OnInit } from "@angular/core"; // Add OnInit if missing
import { Title } from "@angular/platform-browser"; // Add this import
```

### 2. Add OnInit to component class:

```typescript
export class YourPageComponent implements OnInit {
  private title = inject(Title); // Add this injection

  ngOnInit() {
    this.title.setTitle("Your Page Title | Sistema de Trazabilidad");
  }
}
```

## Components that need this fix:

### Animal Routes:

- ✅ `/routes/animal/pages/animal-create/animal-create.page.ts` - "Crear Nuevo Animal"
- ✅ `/routes/animal/pages/animal-edit/animal-edit.page.ts` - "Editar Animal"
- `/routes/animal/pages/animal-detail/animal-detail.page.ts` - "Detalle del Animal"
- `/routes/animal/pages/animal-user-list/animal-user-list.page.ts` - "Animales del Usuario"
- `/routes/animal/pages/animal-history/animal-history.page.ts` - "Historial del Animal"
- `/routes/animal/pages/animal-movement/animal-movement.page.ts` - "Movimientos del Animal"

### Animal Events:

- `/routes/animal/pages/animal-event/sale/pages/sale-create/sale-create.page.ts` - "Crear Venta"
- `/routes/animal/pages/animal-event/sale/pages/sale-list/sale-list.page.ts` - "Lista de Ventas"
- `/routes/animal/pages/animal-event/vaccination/pages/vaccination-create/vaccination-create.page.ts` - "Crear Vacunación"
- `/routes/animal/pages/animal-event/weighing/pages/weighing-create/weighing-create.page.ts` - "Crear Pesaje"
- `/routes/animal/pages/animal-event/weighing/pages/weighing-list/weighing-list.page.ts` - "Lista de Pesajes"

### Land Routes:

- ✅ `/routes/land/pages/land-list/land-list.page.ts` - "Lista de Predios"
- ✅ `/routes/land/pages/land-create/land-create.page.ts` - "Crear Predio"
- `/routes/land/pages/land-edit/land-edit.page.ts` - "Editar Predio"
- `/routes/land/pages/land-detail/land-detail.page.ts` - "Detalle del Predio"
- `/routes/land/pages/land-menu/land-menu.page.ts` - "Gestión de Predios"

### User Routes:

- `/routes/user/pages/user-list/user-list.page.ts` - "Lista de Usuarios"
- `/routes/user/pages/user-profile/user-profile.page.ts` - "Perfil de Usuario"
- `/routes/user/pages/user-edit/user-edit.page.ts` - "Editar Usuario"

### Auth Routes:

- `/routes/auth/register/register.page.ts` - "Registrar Usuario"
- `/routes/auth/login/login.page.ts` - "Iniciar Sesión"

### Tag Routes:

- Add to tag-related components when they're created

## Example Implementation

```typescript
// Before
export class ExamplePage {
  private router = inject(Router);
}

// After
export class ExamplePage implements OnInit {
  private router = inject(Router);
  private title = inject(Title);

  ngOnInit() {
    this.title.setTitle("Example Page | Sistema de Trazabilidad");
  }
}
```

## Status

- ✅ Animal Create Page - Fixed
- ✅ Animal Edit Page - Fixed
- ✅ Land List Page - Fixed
- ✅ Land Create Page - Fixed
- ⏳ Remaining 15+ components need the same pattern applied

## Note

This is a simple, reliable solution that works immediately without depending on router configuration or complex title strategies.
