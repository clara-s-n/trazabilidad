import { Routes } from '@angular/router';
import { authenticatedGuardGuard } from './guard/authenticated-guard.guard';

export const routes: Routes = [
  {
    path: 'auth/login',
    pathMatch: 'full',
    loadComponent:() => 
      import('./routes/auth/pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent:() => 
      import('./routes/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'home',
    pathMatch: 'full',
    loadComponent:() => 
      import('./routes/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'protegida',
    canActivate: 
    [authenticatedGuardGuard],
    pathMatch: 'full',
    loadComponent:() => 
      import('./routes/protegida/protegida.page').then((m) => m.ProtegidaPage),
  },
];
