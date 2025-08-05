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
        //canActivate: [adminGuard],
        data: { menu: true, section: 'Caravanas', title: 'Lista de Caravanas' },
        loadComponent: () =>
          import('./tag-list/tag-list.page').then((m) => m.TagListPage),
      },
    ],
  },
];
