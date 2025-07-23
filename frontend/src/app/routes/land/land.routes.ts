// src/app/routes/land/land.routes.ts
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
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];
