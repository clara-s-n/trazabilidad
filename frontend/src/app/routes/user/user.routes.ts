// src/app/routes/user/user.routes.ts
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
        path: ':id/delete',
        loadComponent: () =>
          import('./delete/delete.page').then(m => m.DeletePage)
      },
      {
        path: ':id/profile',
        loadComponent: () =>
          import('./profile/profile.page').then(m => m.ProfilePage)
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];
