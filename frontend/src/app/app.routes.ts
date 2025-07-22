import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth/login',
    pathMatch: 'full',
    loadComponent:() => 
      import('./routes/auth/login/login.page').then((m) => m.LoginPage),
  },
    {
    path: 'home',
    pathMatch: 'full',
    loadComponent:() => 
      import('./routes/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent:() => 
      import('./routes/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'protegida',
    pathMatch: 'full',
    loadComponent:() => 
      import('./routes/protegida/protegida.page').then((m) => m.ProtegidaHome),
  },
];
