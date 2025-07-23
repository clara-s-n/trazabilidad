import { Routes } from '@angular/router';
import {protectedGuard} from "./guards/protected.guard";

export const routes: Routes = [
  {
    path: 'auth/login',
    pathMatch: 'full',
    loadComponent:() =>
      import('./routes/auth/pages/login/login.page').then((m) => m.LoginPage)
  },
  {
    path: '',
    redirectTo: '/homepage',
    pathMatch: 'full',
  },
  {
    path: 'homepage',
    pathMatch: 'full',
    loadComponent: () =>
      import('./routes/home/pages/homepage/homepage.page').then((m) => m.HomepagePage),
  },
  {
    path: 'protected',
    pathMatch: 'full',
    canActivate: [protectedGuard],
    loadComponent: () =>
      import('./routes/protegida/pages/protected/protected.page').then((m) => m.ProtectedPage),
  },
];
