// src/app/routes/land/land.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadComponent: () =>
          import('./pages/list/list.page').then(m => m.ListPage)
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./pages/create/create.page').then(m => m.CreatePage)
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./pages/detail/detail.page').then(m => m.DetailPage)
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import('./pages/edit/edit.page').then(m => m.EditPage)
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];
