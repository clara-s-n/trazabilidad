import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { MainStoreService } from '../services/main-store.service';

export const authorizationInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const mainStore = inject(MainStoreService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 403 Forbidden responses
      if (error.status === 403) {
        console.warn('Access denied:', error.error?.error || 'Forbidden access');
        
        // If user is authenticated but doesn't have permission
        if (mainStore.isAuthenticated()) {
          router.navigate(['/unauthorized']);
        } else {
          // If not authenticated, redirect to login
          router.navigate(['/auth/login']);
        }
      }
      
      // Handle 401 Unauthorized responses
      if (error.status === 401) {
        console.warn('Authentication required');
        mainStore.clearAuth();
        router.navigate(['/auth/login']);
      }

      return throwError(() => error);
    })
  );
};
