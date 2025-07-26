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
          import('./pesaje/create/create.page').then(m => m.CreatePage)
      },
      {
        path: 'vacunacion/create',
        data: { menu: true, section: 'Eventos', title: 'Crear vacunación' },
        loadComponent: () =>
          import('./vacunacion/create/create.page').then(m => m.CreatePage)
      },
      {
        path: 'venta/create',
        data: { menu: true, section: 'Eventos', title: 'Crear venta' },
        loadComponent: () =>
          import('./venta/create/create.page').then(m => m.CreatePage)
      },
      {
        path: 'transporte/create',
        data: { menu: true, section: 'Eventos', title: 'Crear transporte' },
        loadComponent: () =>
          import('./transporte/create/create.page').then(m => m.CreatePage)
      }
    ]
  }
];