import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MainStoreService } from './main-store.service';
import { Login } from '../model/login';
import { Token } from '../model/token';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private store = inject(MainStoreService);
  private api = environment.apiUrl;

  async login(email: string, password: string): Promise<boolean> {
    try {
      const loginData: Login = { email, password };

      // Authenticate and get token
      const response = await firstValueFrom(
        this.http.post<{ token: string }>(`${this.api}auth/login`, loginData)
      );

      // Store token
      this.store.setToken(response.token);

      return true;
    } catch (error) {
      console.error('Authentication failed:', error);
      throw new Error('Invalid credentials');
    }
  }

  async register(
    email: string,
    password: string,
    role?: string
  ): Promise<boolean> {
    try {
      const registerData = {
        email,
        password,
        role_id: role === 'admin' ? 3 : role === 'operator' ? 1 : 2, // Default to consulta
      };

      // Register user
      await firstValueFrom(
        this.http.post(`${this.api}auth/register`, registerData)
      );

      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      throw new Error('Registration failed');
    }
  }
  async logout(): Promise<void> {
    try {
      // Clear stored data (implement these methods in MainStoreService if needed)
      // this.store.clearToken();
      // this.store.clearUser();

      // For now, set empty/null values
      this.store.setToken('');
      // this.store.setUser(null);

      // Redirect to login
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Logout error:', error);
      // Force redirect even on error
      this.router.navigate(['/auth/login']);
    }
  }

  async getCurrentUser(): Promise<User> {
    try {
      // This would require a /auth/me endpoint or similar
      const user = await firstValueFrom(
        this.http.get<User>(`${this.api}auth/me`)
      );
      return user;
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      throw error;
    }
  }

  isAuthenticated(): boolean {
    // Check if token exists and is not empty
    const token = this.store.token();
    return !!(token && token.trim().length > 0);
  }

  getToken(): string | null {
    return this.store.token() || null;
  }

  async refreshToken(): Promise<boolean> {
    try {
      const currentToken = this.getToken();
      if (!currentToken) {
        return false;
      }

      const response = await firstValueFrom(
        this.http.post<{ token: string }>(`${this.api}auth/refresh`, {
          token: currentToken,
        })
      );

      this.store.setToken(response.token);
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      await this.logout();
      return false;
    }
  }
}
