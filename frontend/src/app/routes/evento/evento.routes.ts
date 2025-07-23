// src/app/routes/evento/evento.routes.ts
import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'pesaje/create',
        loadComponent: () =>
          import('./pesaje/create/create.page').then(m => m.CreatePage)
      },
      {
        path: 'vacunacion/create',
        loadComponent: () =>
          import('./vacunacion/create/create.page').then(m => m.CreatePage)
      },
      {
        path: 'venta/create',
        loadComponent: () =>
          import('./venta/create/create.page').then(m => m.CreatePage)
      },
      {
        path: 'transporte/create',
        loadComponent: () =>
          import('./transporte/create/create.page').then(m => m.CreatePage)
      },
      {
        path: '',
        redirectTo: 'pesaje/create',
        pathMatch: 'full'
      }
    ]
  }
];
