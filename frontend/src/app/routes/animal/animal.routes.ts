import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      // 1. Redirect inicial
      { path: '', redirectTo: 'list', pathMatch: 'full' },

      // 2. Rutas estáticas
      {
        path: 'list',
        data: { menu: true, section: 'Animales', title: 'Lista de animales' },
        loadComponent: () =>
          import('./animal-list/animal-list.page').then(m => m.ListPage)
      },
      {
        path: 'create',
        data: { menu: true, section: 'Animales', title: 'Crear un animal' },
        loadComponent: () =>
          import('./animal-create/animal-create.page').then(m => m.CreatePage)
      },

      // 3. Rutas con sub-segmentos dinámicos
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./animal-edit/animal-edit.page').then(m => m.EditPage)
      },
      {
        path: ':id/events',
        loadComponent: () =>
          import('./animal-events/animal-events.page').then(m => m.EventsPage)
      },
      {
        path: ':id/history',
        loadComponent: () =>
          import('./animal-history/animal-history.page').then(m => m.HistoryPage)
      },
      {
        path: ':id/movements',
        loadComponent: () =>
          import('./animal-movements/animal-movements.page').then(m => m.MovementsPage)
      },

      // 4. Ruta “lista por usuario”
      {
        path: ':userId/list',
        pathMatch: 'full',
        loadComponent: () =>
          import('./animal-user-list/animal-user-list.page').then(m => m.UserListPage)
      },

      // 5. Ruta genérica detalle
      {
        path: ':id',
        loadComponent: () =>
          import('./animal-detail/animal-detail.page').then(m => m.DetailPage)
      }
    ]
  }
];