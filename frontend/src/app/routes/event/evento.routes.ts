import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      // Redirect inicial a 'pesaje/create'
      { path: '', redirectTo: 'pesaje/create', pathMatch: 'full' },

      // Rutas estáticas de creación
      {
        path: 'pesaje/create',
        data: { menu: true, section: 'Eventos', title: 'Crear pesaje' },
        loadComponent: () =>
          import('./weighing/weighing-create/weighing-create.page').then(m => m.CreatePage)
      },
      {
        path: 'vacunacion/create',
        data: { menu: true, section: 'Eventos', title: 'Crear vacunación' },
        loadComponent: () =>
          import('./vaccination/vaccination-create/vaccination-create.page').then(m => m.CreatePage)
      },
      {
        path: 'venta/create',
        data: { menu: true, section: 'Eventos', title: 'Crear venta' },
        loadComponent: () =>
          import('./sale/sale-create/sale-create.page').then(m => m.CreatePage)
      },
      {
        path: 'transporte/create',
        data: { menu: true, section: 'Eventos', title: 'Crear transporte' },
        loadComponent: () =>
          import('./transport/sale-create/sale-create.page').then(m => m.CreatePage)
      }
    ]
  }
];