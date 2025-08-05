import { Routes } from '@angular/router';
import { adminGuard } from 'src/app/guards/admin.guard';
import { adminOrOperatorGuard } from 'src/app/guards/admin-or-operator.guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      // Redirect a list
      { path: '', redirectTo: 'list', pathMatch: 'full' },

      // Listado (admin and operators only)
      {
        path: 'list',
        canActivate: [adminOrOperatorGuard], // Tags management for admin and operators only
        data: { menu: true, section: 'Caravanas', title: 'Lista de Caravanas' },
        loadComponent: () =>
          import('./tag-list/tag-list.page').then((m) => m.TagListPage),
      },
    ],
  },
];
