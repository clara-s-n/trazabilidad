import { CanActivateFn, Router } from '@angular/router';
import { MainStoreService } from '../services/main-store.service';
import { inject } from '@angular/core';

export const operatorGuard: CanActivateFn = (route, state) => {
  const store: MainStoreService = inject(MainStoreService);
  const router = inject(Router);

  if (!store.isOperator()) {
    console.warn('Acceso denegado: el usuario no es operador');
    router.navigate(['/dashboard']); // Redirige al dashboard si no es operador
    return false; // Bloquea el acceso si no es operador
  }

  return true; // Permite el acceso si es administrador o operador
};
