import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./routes/auth/auth.routes').then(m => m.routes) },
  { path: 'user', loadChildren: () => import('./routes/user/user.routes').then(m => m.routes) },
  { path: 'land', loadChildren: () => import('./routes/land/land.routes').then(m => m.routes) },
  { path: 'animal', loadChildren: () => import('./routes/animal/animal.routes').then(m => m.routes) },
  { path: 'event', loadChildren: () => import('./routes/event/event.routes').then(m => m.routes) },
  { path: 'tag', 
    pathMatch: 'full',
    loadChildren: () => import('./routes/tags/tag-list/tag-list.page').then(m => m.TagListPage)
   },
  /*{
    path: '**',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent)
  }*/
];

