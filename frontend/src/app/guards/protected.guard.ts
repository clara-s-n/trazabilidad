import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const protectedGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const user: boolean = false;

  // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
  if (!user) {
    await router.navigate(['auth', 'login'])
    return false;
  }

  return true;
};
