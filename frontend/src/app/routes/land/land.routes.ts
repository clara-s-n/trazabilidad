// src/app/routes/land/land.routes.ts
import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
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
