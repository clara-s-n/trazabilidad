import { Routes } from '@angular/router';
import { adminGuard } from 'src/app/guards/admin.guard';
import { adminOrSelfGuard } from 'src/app/guards/admin-or-self.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      // Redirect a list
      { path: '', redirectTo: 'list', pathMatch: 'full' },

      // Listado (solo admin)
      {
        path: 'list',
        canActivate: [adminGuard],
        data: { menu: true, section: 'Usuarios', title: 'Lista de usuarios' },
        loadComponent: () =>
          import('./pages/user-list/user-list.page').then(m => m.ListPage)
      },

      // Profile
      {
        path: ':id/profile',
        canActivate: [adminOrSelfGuard],
        loadComponent: () =>
          import('./pages/user-profile/user-profile.page').then(m => m.ProfilePage)
      }
    ]
  }
];
