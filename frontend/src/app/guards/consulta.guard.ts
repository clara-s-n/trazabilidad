import { CanActivateFn, Router } from '@angular/router';
import { MainStoreService } from '../services/main-store.service';
import { inject } from '@angular/core';

export const consultaGuard: CanActivateFn = (route, state) => {
  const store = inject(MainStoreService);
  const router = inject(Router);

  // Role ID 2 is Consulta role
  if (store.userRoleId() !== 2) {
    console.warn('Acceso denegado: el usuario no es consulta');
    router.navigate(['/unauthorized']); // Redirect to unauthorized page
    return false;
  }
  return true;
};
