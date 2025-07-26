import { Routes } from '@angular/router';
import { userGuard } from 'src/app/guards/user.guard';
import { adminGuard } from 'src/app/guards/admin.guard';

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
          import('./list/list.page').then(m => m.ListPage)
      },

      // Delete
      {
        path: ':id/delete',
        loadComponent: () =>
          import('./delete/delete.page').then(m => m.DeletePage)
      },
      // Profile
      {
        path: ':id/profile',
        canActivate: [userGuard],
        loadComponent: () =>
          import('./profile/profile.page').then(m => m.ProfilePage)
      }
    ]
  }
];