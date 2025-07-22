import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth/login',
    pathMatch: 'full',
    loadComponent:() => 
      import('./routes/auth/login/login.page').then((m) => m.LoginPage),
  },
];
