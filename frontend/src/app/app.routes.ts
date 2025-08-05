import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { userGuard } from './guards/user.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./routes/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./pages/unauthorized/unauthorized.page').then(m => m.UnauthorizedPage)
  },
  {
    path: '',
    loadComponent: () => import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    canActivate: [userGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        data: { title: 'Panel de Control' },
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'animal',
        loadChildren: () =>
          import('./routes/animal/animal.routes').then((m) => m.routes)
      },
      {
        path: 'land',
        loadChildren: () =>
          import('./routes/land/land.routes').then((m) => m.routes)
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./routes/user/user.routes').then((m) => m.routes)
      },
      {
        path: 'unauthorized',
        loadComponent: () => import('./pages/unauthorized/unauthorized.page').then(m => m.UnauthorizedPage)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];
