import { CanActivateFn, Router } from '@angular/router';
import { MainStoreService } from '../services/main-store.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const store: MainStoreService = inject(MainStoreService);
  const router = inject(Router);

  if (!store.isAuthenticated()) {
    console.warn('Acceso denegado: el usuario no está autenticado');
    window.alert('Por favor, inicie sesión para continuar.');
    router.navigate(['/auth/login']); // Redirige a auth/login
    return false; // Bloquea el acceso si no está autenticado
  }

  return true; // Permite el acceso si hay usuario autenticado
};
