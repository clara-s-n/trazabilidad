import {CanActivateFn, Router} from '@angular/router';
import {MainStoreService} from "../services/main-store.service";
import {inject} from "@angular/core";

export const operatorGuard: CanActivateFn = (route, state) => {
  const store : MainStoreService = inject(MainStoreService);
  const router = inject(Router)

  if (!store.isOperator()) {
    console.warn('Acceso denegado: el usuario no es administrador ni operador');
    return false; // Bloquea el acceso si no es administrador ni operador
    router.navigate(['/']); // Redirige a la página de inicio si no es administrador ni operador
  }

  return true; // Permite el acceso si es administrador o operador
};
