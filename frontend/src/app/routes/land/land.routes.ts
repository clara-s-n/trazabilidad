import { Routes } from '@angular/router';
import { userGuard } from 'src/app/guards/user.guard';
import { adminOrOperatorGuard } from 'src/app/guards/admin-or-operator.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      // Redirect a lista
      { path: '', redirectTo: 'list', pathMatch: 'full', canActivate: [userGuard] },

      // List y create protegidas
      {
        path: 'list',
        canActivate: [userGuard],
        data: { menu: true, section: 'Predios', title: 'Lista de predios' },
        loadComponent: () =>
          import('./pages/list/list.page').then(m => m.ListPage)
      },
      {
        path: 'create',
        canActivate: [adminOrOperatorGuard],
        data: { menu: true, section: 'Predios', title: 'Crear predio' },
        loadComponent: () =>
          import('./pages/create/create.page').then(m => m.CreatePage)
      },

      // Edit antes de detail
      {
        path: 'edit/:id',
        canActivate: [adminOrOperatorGuard],
        loadComponent: () =>
          import('./pages/edit/edit.page').then(m => m.EditPage)
      },
      {
        path: ':id',
        canActivate: [userGuard],
        loadComponent: () =>
          import('./pages/detail/detail.page').then(m => m.DetailPage)
      }
    ]
  }
];