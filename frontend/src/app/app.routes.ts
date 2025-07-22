import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth/login',
    pathMatch: 'full',
    loadComponent:() => 
      import('./routes/auth/pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
];
