import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./routes/auth/auth.routes').then((m) => m.routes),
  },
  {
    path: '',
    canActivate: [authGuard],

    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(
        (m) => m.MainLayoutComponent
      ),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./routes/user/user.routes').then((m) => m.routes),
      },
      {
        path: 'land',
        loadChildren: () =>
          import('./routes/land/land.routes').then((m) => m.routes),
      },
      {
        path: 'animal',
        loadChildren: () =>
          import('./routes/animal/animal.routes').then((m) => m.routes),
      },
      {
        path: 'tags',
        loadChildren: () =>
          import('./routes/tags/tag.routes').then((m) => m.routes),
      },
    ],
  },
];
