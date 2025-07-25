// src/app/routes/land/land.routes.ts
import { Routes } from '@angular/router';
import {userGuard} from "../../guards/user.guard";
import {adminOrOperatorGuard} from "../../guards/admin-or-operator.guard";

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        canActivate: [userGuard],
        loadComponent: () =>
          import('./pages/list/list.page').then(m => m.ListPage)
      },
      {
        path: 'create',
        canActivate: [adminOrOperatorGuard],
        loadComponent: () =>
          import('./pages/create/create.page').then(m => m.CreatePage)
      },
      {
        path: ':id',
        canActivate: [userGuard],
        loadComponent: () =>
          import('./pages/detail/detail.page').then(m => m.DetailPage)
      },
      {
        path: 'edit/:id',
        canActivate: [adminOrOperatorGuard],
        loadComponent: () =>
          import('./pages/edit/edit.page').then(m => m.EditPage)
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
        canActivate: [userGuard],
      }
    ]
  }
];
