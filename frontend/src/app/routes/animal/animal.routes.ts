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
          import('./animal-list/animal-list.page').then((m) => m.ListPage),
      },
      {
        path: 'create',
        data: { menu: true, section: 'Animales', title: 'Crear un animal' },
        loadComponent: () =>
          import('./animal-create/animal-create.page').then(
            (m) => m.AnimalCreatePage
          ),
      },

      // 3. Rutas con sub-segmentos dinámicos
      {
        path: 'edit/:animal_id',
        loadComponent: () =>
          import('./animal-edit/animal-edit.page').then(
            (m) => m.AnimalEditPage
          ),
      },
      {
        path: 'events/:animal_id',
        loadComponent: () =>
          import('./animal-events/animal-events.page').then(
            (m) => m.EventsPage
          ),
      },
      {
        path: 'history/:animal_id',
        loadComponent: () =>
          import('./animal-history/animal-history.page').then(
            (m) => m.HistoryPage
          ),
      },
      {
        path: 'movements/:animal_id',
        loadComponent: () =>
          import('./animal-movements/animal-movements.page').then(
            (m) => m.MovementsPage
          ),
      },

      // 4. Ruta “lista por usuario”
      {
        path: ':userId/list',
        pathMatch: 'full',
        loadComponent: () =>
          import('./animal-user-list/animal-user-list.page').then(
            (m) => m.UserListPage
          ),
      },

      // 5. Ruta genérica detalle
      {
        path: ':animal_id',
        loadComponent: () =>
          import('./animal-detail/animal-detail.page').then(
            (m) => m.DetailPage
          ),
      },
    ],
  },
];
