import { effect, Injectable, signal, computed } from '@angular/core';
import { User } from '../model/user';
import { JWTPayload } from '../model/payload';

@Injectable({
  providedIn: 'root'
})
export class MainStoreService {
  // Señal para datos del usuario completo (backend)
  public usuario = signal<User | null>(null);

  // Señal para el token JWT
  public token = signal<string | null>(localStorage.getItem('access_token'));

  // Nuevas señales para desglosar el payload
  public userId = signal<string | null>(null);
  public userEmail = signal<string | null>(null);
  public userRoleId = signal<number | null>(null);

  // Computed signal para verificar si es administrador (role_id = 3)
  public isAdmin = computed(() => this.userRoleId() === 3);

  // Computed signal para verificar si hay usuario autenticado
  public isAuthenticated = computed(() => {
    return this.usuario() !== null && this.token() !== null;
  });

  // Computed signal para verificar si el usuario es un operador (role_id = 1)
  public isOperator = computed(() => this.userRoleId() === 1);

  // Computed signal para verificar si el usuario es operador o administrador
  public isOperatorOrAdmin = computed(() => {
    if (this.isOperator()) {
      return true;
    } else if (this.isAdmin()) {
      return true;
    }
    return false;
  });

  // Efecto de depuración para usuario
  private userEffect = effect(() => {
    console.log('Usuario actualizado:', this.usuario());
  });

  // Efecto de depuración para token y decodificación
  private tokenEffect = effect(() => {
    console.log('🔑 Token actualizado:', this.token());
    this.decodePayload();
  });

  constructor() {
    // Al inicializar, si hay token en localStorage, decodificarlo
    if (this.token()) {
      this.decodePayload();
    }
  }

  // Decodifica el payload del JWT y actualiza las señales correspondientes.
  private decodePayload() {
    const token = this.token();
    if (!token) {
      this.userId.set(null);
      this.userEmail.set(null);
      this.userRoleId.set(null);
      return;
    }
    try {
      // Extraer la segunda parte (payload) y decodificar Base64URL
      const payloadBase64 = token.split('.')[1];
      const payloadJson = decodeURIComponent(
        atob(payloadBase64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      const payload = JSON.parse(payloadJson) as JWTPayload;

      // Actualizar señales con datos desglosados
      this.userId.set(payload.user_id);
      this.userEmail.set(payload.user);
      this.userRoleId.set(payload.role_id);
      console.log('Payload decodificado:', payload);

      // Actualizar usuario completo
      this.usuario.set({
        user_id: payload.user_id,
        email: payload.user,
        role_id: payload.role_id
      });
    } catch (error) {
      console.error('Error al decodificar JWT payload:', error);
      this.userId.set(null);
      this.userEmail.set(null);
      this.userRoleId.set(null);
    }
  }

  // Guarda el token en la señal y en localStorage.
  setToken(token: string) {
    this.token.set(token);
    localStorage.setItem('access_token', token);
    // Actualiza señales desglosadas si el usuario tiene un token
    if (this.token()) {
      this.decodePayload();
    }
    // Seteamos el usuario en la señal y en localStorage si ya existe

  }

  // Guarda el usuario en la señal y en localStorage.
  setUser(user: User) {
    this.usuario.set(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Limpia datos de autenticación y señales relacionadas.
  clearAuth() {
    this.usuario.set(null);
    localStorage.removeItem('user')
    localStorage.removeItem('access_token');
    this.token.set(null);
    this.userId.set(null);
    this.userEmail.set(null);
    this.userRoleId.set(null);
  }
}
