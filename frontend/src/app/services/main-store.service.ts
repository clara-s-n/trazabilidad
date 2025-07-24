import { effect, Injectable, signal } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class MainStoreService {

  public usuario = signal<User | undefined>(undefined);

  private efecto = effect(() => {
    console.log("Usuario effecteado: ", this.usuario())
  })

  // Estado del token JWT
  public token = signal<string | null>(localStorage.getItem('access_token'));

  // Efecto para depurar cambios de token
  private tokenEffect = effect(() => {
    console.log('🔑 Token actualizado:', this.token());
  });

  constructor() { }

  // Setear el token en la Signal
  setToken(token: string) {
    this.token.set(token);
    localStorage.setItem('access_token', token);
  }


  // Llamar tras un login exitoso
  setAuth(user: User, token: string) {
    this.usuario.set(user);
    localStorage.setItem('access_token', token);
    this.token.set(token);
  }

  // Llamar en logout
  clearAuth() {
    this.usuario.set(undefined);
    localStorage.removeItem('access_token');
    this.token.set(null);
  }
}
