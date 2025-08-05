import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MainStoreService } from '../services/main-store.service';

export const adminOrSelfGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  const store = inject(MainStoreService);
  const router = inject(Router);
  
  // Obtengo el userId desde los params de la ruta y extraigo el valor real
  let routeUserId = route.paramMap.get('userId') ?? '';
  
  // Si es un objeto Computed, extraemos el valor real
  if (routeUserId && typeof routeUserId === 'object') {
    // Usamos aserciones de tipo para evitar errores de TypeScript
    const objUserId = routeUserId as unknown as { 
      toString?: () => string; 
      value?: string;
    };
    
    if (objUserId.toString && typeof objUserId.toString === 'function') {
      routeUserId = objUserId.toString();
    } else if (objUserId.value !== undefined) {
      routeUserId = objUserId.value;
    } else {
      // Intenta convertirlo a string como último recurso
      routeUserId = String(routeUserId).replace('[Computed: ', '').replace(']', '');
    }
  }

  console.log('User ID procesado:', routeUserId);

  if (!routeUserId || !store.isAdminOrSelf(routeUserId)) {
    console.log('User ID 2:', routeUserId);
    console.error(store.userId(), 'is not admin or self');

    console.warn('Acceso denegado: el usuario no es administrador ni el propio usuario');
    return router.createUrlTree(['/dashboard']); // Redirige a dashboard en caso de error
  }

  return true; // Permite el acceso si es administrador o el propio usuario
};
