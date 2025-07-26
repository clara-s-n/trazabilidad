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
          import('./list/list.page').then(m => m.ListPage)
      },
      {
        path: 'create',
        data: { menu: true, section: 'Animales', title: 'Crear un animal' },
        loadComponent: () =>
          import('./create/create.page').then(m => m.CreatePage)
      },

      // 3. Rutas con sub-segmentos dinámicos
      {
        path: ':id/edit',
        loadComponent: () =>
          import('./edit/edit.page').then(m => m.EditPage)
      },
      {
        path: ':id/events',
        loadComponent: () =>
          import('./events/events.page').then(m => m.EventsPage)
      },
      {
        path: ':id/history',
        loadComponent: () =>
          import('./history/history.page').then(m => m.HistoryPage)
      },
      {
        path: ':id/movements',
        loadComponent: () =>
          import('./movements/movements.page').then(m => m.MovementsPage)
      },

      // 4. Ruta “lista por usuario”
      {
        path: ':userId/list',
        pathMatch: 'full',
        loadComponent: () =>
          import('./user-list/user-list.page').then(m => m.UserListPage)
      },

      // 5. Ruta genérica detalle (deja esta al final)
      {
        path: ':id',
        loadComponent: () =>
          import('./detail/detail.page').then(m => m.DetailPage)
      }
    ]
  }
];