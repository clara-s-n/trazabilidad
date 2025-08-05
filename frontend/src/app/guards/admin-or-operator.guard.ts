import { CanActivateFn, Router } from '@angular/router';
import { MainStoreService } from '../services/main-store.service';
import { inject } from '@angular/core';

export const adminOrOperatorGuard: CanActivateFn = (route, state) => {
  const store: MainStoreService = inject(MainStoreService);
  const router = inject(Router);

  if (!store.isOperatorOrAdmin()) {
    console.warn('Acceso denegado: el usuario no es administrador ni operador');
    router.navigate(['/dashboard']); // Redirige al dashboard si no es admin/operador
    return false; // Bloquea el acceso si no es administrador ni operador
  }

  return true; // Permite el acceso si es administrador o operador
};
