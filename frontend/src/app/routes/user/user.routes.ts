// src/app/routes/user/user.routes.ts
import { Routes } from '@angular/router';
import {userGuard} from "../../guards/user.guard";
import {adminGuard} from "../../guards/admin.guard";

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        canActivate: [adminGuard],
        loadComponent: () =>
          import('./list/list.page').then(m => m.ListPage)
      },
      {
        path: ':id/delete',
        loadComponent: () =>
          import('./delete/delete.page').then(m => m.DeletePage)
      },
      {
        path: ':id/profile',
        canActivate: [userGuard],
        loadComponent: () =>
          import('./profile/profile.page').then(m => m.ProfilePage)
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];
