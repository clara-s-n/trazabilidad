import { Routes } from '@angular/router';
import { userGuard } from 'src/app/guards/user.guard';
import { adminOrOperatorGuard } from 'src/app/guards/admin-or-operator.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        canActivate: [userGuard],
        loadComponent: () =>
          import('./pages/land-menu/land-menu.page').then(
            (m) => m.LandMenuPage
          ),
      },
      // List y create protegidas
      {
        path: 'list',
        canActivate: [userGuard],
        data: { menu: true, section: 'Predios', title: 'Lista de predios' },
        loadComponent: () =>
          import('./pages/land-list/land-list.page').then((m) => m.ListPage),
      },
      {
        path: 'create',
        canActivate: [adminOrOperatorGuard],
        data: { menu: true, section: 'Predios', title: 'Crear predio' },
        loadComponent: () =>
          import('./pages/land-create/land-create.page').then(
            (m) => m.LandCreatePage
          ),
      },

      // Edit antes de detail
      {
        path: 'edit/:id',
        canActivate: [adminOrOperatorGuard],
        loadComponent: () =>
          import('./pages/land-edit/land-edit.page').then((m) => m.EditPage),
      },
      {
        path: ':id',
        canActivate: [userGuard],
        loadComponent: () =>
          import('./pages/land-detail/land-detail.page').then(
            (m) => m.DetailPage
          ),
      },
    ],
  },
];
