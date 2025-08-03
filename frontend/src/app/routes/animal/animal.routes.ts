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
            (m) => m.CreatePage
          ),
      },

      // 3. Rutas con sub-segmentos dinámicos
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./animal-edit/animal-edit.page').then((m) => m.EditPage),
      },
      {
        path: 'events/:id',
        loadComponent: () =>
          import('./animal-event/animal-event.page').then((m) => m.EventsPage),
      },
      {
        path: 'events/:id/sale',
        loadComponent: () =>
          import('./animal-event/sale/pages/sale-list/sale-list.page').then(
            (m) => m.SaleListPage
          ),
      },
      {
        path: 'events/:id/sale/create',
        loadComponent: () =>
          import('./animal-event/sale/pages/sale-create/sale-create.page').then(
            (m) => m.SaleCreatePage
          ),
      },
      {
        path: 'events/:id/vaccination',
        loadComponent: () =>
          import(
            './animal-event/vaccination/pages/vaccination-list/vaccination-list.page'
          ).then((m) => m.VaccinationListPage),
      },
      {
        path: 'events/:id/vaccination/create',
        loadComponent: () =>
          import(
            './animal-event/vaccination/pages/vaccination-create/vaccination-create.page'
          ).then((m) => m.VaccinationCreatePage),
      },
      {
        path: 'events/:id/weighing',
        loadComponent: () =>
          import(
            './animal-event/weighing/pages/weighing-list/weighing-list.page'
          ).then((m) => m.WeighingListPage),
      },
      {
        path: 'events/:id/weighing/create',
        loadComponent: () =>
          import(
            './animal-event/weighing/pages/weighing-create/weighing-create.page'
          ).then((m) => m.WeighingCreatePage),
      },
      {
        path: 'history/:id',
        loadComponent: () =>
          import('./animal-history/animal-history.page').then(
            (m) => m.HistoryPage
          ),
      },
      {
        path: 'movements/:id',
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
        path: ':id',
        loadComponent: () =>
          import('./animal-detail/animal-detail.page').then(
            (m) => m.DetailPage
          ),
      },
    ],
  },
];
