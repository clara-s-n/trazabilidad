import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authenticatedGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const hayUsuarioAutenticado = false;
  if(!hayUsuarioAutenticado){
    router.navigate(["auth", "login"]);
  }
  return true;
};
