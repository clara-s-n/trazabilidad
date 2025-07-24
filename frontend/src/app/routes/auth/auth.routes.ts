// src/app/routes/auth/auth.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./login/login.page').then(m => m.LoginPage)
      },
      {
        path: 'logout',
        loadComponent: () =>
          import('./logout/logout.page').then(m => m.LogoutPage)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./register/register.page').then(m => m.RegisterPage)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];
