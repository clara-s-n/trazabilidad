import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MainStoreService } from '../services/main-store.service';

export const authenticatedGuardGuard: CanActivateFn = (route, state) => {
 
  const mainStore = inject(MainStoreService);
  
  const router = inject(Router);
  
  const usuario = mainStore.usuario();
  
  if(!usuario){
  
    router.navigate(["auth", "login"]);
    return false;
  }
  
  return true;
};
