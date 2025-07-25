// src/app/routes/animal/animal.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./list/list.page').then(m => m.ListPage)
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./create/create.page').then(m => m.CreatePage)
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./detail/detail.page').then(m => m.DetailPage)
      },
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
      {
        path: ':userId/list',
        pathMatch: 'full',
        loadComponent: () =>
          import('./user-list/user-list.page').then(m => m.UserListPage)
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];
