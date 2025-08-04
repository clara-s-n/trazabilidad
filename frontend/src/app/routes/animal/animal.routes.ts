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
          import('./pages/animal-list/animal-list.page').then(
            (m) => m.ListPage
          ),
      },
      {
        path: 'create',
        data: { menu: true, section: 'Animales', title: 'Crear un animal' },
        loadComponent: () =>
          import('./pages/animal-create/animal-create.page').then(
            (m) => m.AnimalCreatePage
          ),
      },

      // 3. Rutas con sub-segmentos dinámicos
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./pages/animal-edit/animal-edit.page').then(
            (m) => m.AnimalEditPage
          ),
      },
      {
        path: 'events/:id',
        loadComponent: () =>
          import('./pages/animal-event/animal-event.page').then(
            (m) => m.EventsPage
          ),
      },
      {
        path: 'events/:id/sale',
        loadComponent: () =>
          import(
            './pages/animal-event/sale/pages/sale-list/sale-list.page'
          ).then((m) => m.SaleListPage),
      },
      {
        path: 'events/:id/sale/create',
        loadComponent: () =>
          import(
            './pages/animal-event/sale/pages/sale-create/sale-create.page'
          ).then((m) => m.SaleCreatePage),
      },
      {
        path: 'events/:id/vaccination',
        loadComponent: () =>
          import(
            './pages/animal-event/vaccination/pages/vaccination-list/vaccination-list.page'
          ).then((m) => m.VaccinationListPage),
      },
      {
        path: 'events/:id/vaccination/create',
        loadComponent: () =>
          import(
            './pages/animal-event/vaccination/pages/vaccination-create/vaccination-create.page'
          ).then((m) => m.VaccinationCreatePage),
      },
      {
        path: 'events/:id/weighing',
        loadComponent: () =>
          import(
            './pages/animal-event/weighing/pages/weighing-list/weighing-list.page'
          ).then((m) => m.WeighingListPage),
      },
      {
        path: 'events/:id/weighing/create',
        loadComponent: () =>
          import(
            './pages/animal-event/weighing/pages/weighing-create/weighing-create.page'
          ).then((m) => m.WeighingCreatePage),
      },
      {
        path: 'history/:id',
        loadComponent: () =>
          import('./pages/animal-history/animal-history.page').then(
            (m) => m.HistoryPage
          ),
      },
      {
        path: 'movements/:id',
        loadComponent: () =>
          import('./pages/animal-movement/animal-movement.page').then(
            (m) => m.MovementPage
          ),
      },

      // 4. Ruta “lista por usuario”
      {
        path: ':userId/list',
        pathMatch: 'full',
        loadComponent: () =>
          import('./pages/animal-user-list/animal-user-list.page').then(
            (m) => m.AnimalUserListPage
          ),
      },

      // 5. Ruta genérica detalle
      {
        path: ':animal_id',
        loadComponent: () =>
          import('./pages/animal-detail/animal-detail.page').then(
            (m) => m.DetailPage
          ),
      },
    ],
  },
];
