import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { MainStoreService } from '../services/main-store.service';

export const adminOrSelfGuard: CanActivateFn = (route, state) => {
  const store = inject(MainStoreService);
  const userId = route.paramMap.get('id');

  if (!userId || !store.isAdminOrSelf(userId)) {
    console.warn('Acceso denegado: el usuario no es administrador ni el propio usuario');
    return false; // Bloquea el acceso si no es administrador o el propio usuario
  }

  return true; // Permite el acceso si es administrador o el propio usuario
};
