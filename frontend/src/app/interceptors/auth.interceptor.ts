import { HttpInterceptorFn } from '@angular/common/http';
import { MainStoreService } from '../services/main-store.service';
import { environment } from 'src/environments/environment';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(MainStoreService);
  const apiUrl = environment.apiUrl;
  const _authUrl = `${apiUrl}auth/login`;
  const skipUrls = [_authUrl];

  // 1) Comprobamos si la URL debe saltarse
  const isSkip = skipUrls.some(u => req.url.includes(u));
  if (isSkip) {
    return next(req);
  }

  // 2) Leemos el token de la Signal
  const token = store.token();
  if (!token) {
    // no hay token → enviamos sin Authorization
    return next(req);
  }

  // 3) Clonamos la petición añadiendo el header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  return next(authReq);
};
