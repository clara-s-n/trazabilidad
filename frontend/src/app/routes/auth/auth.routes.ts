import { Routes } from '@angular/router';
import { adminGuard } from 'src/app/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      // Redirect inicial al login
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      // Login y logout (estáticas)
      {
        path: 'login',
        data: { menu: true, section: 'Auth', title: 'Login de usuario' },
        loadComponent: () =>
          import('./login/login.page').then(m => m.LoginPage)
      },
      {
        path: 'logout',
        data: { menu: true, section: 'Auth', title: 'Logout de usuario' },
        loadComponent: () =>
          import('./logout/logout.page').then(m => m.LogoutPage)
      },

      // Registro (solo admin)
      {
        path: 'register',
        canActivate: [adminGuard],
        data: { menu: true, section: 'Auth', title: 'Registro de usuario' },
        loadComponent: () =>
          import('./register/register.page').then(m => m.RegisterPage)
      }
    ]
  }
];