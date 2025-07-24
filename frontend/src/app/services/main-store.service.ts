import { effect, Injectable, signal } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class MainStoreService {
  
  public usuario = signal<User | undefined> (undefined);

  private efecto = effect(() =>{
    console.log("Usuario effecteado: ", this.usuario())
  })

  constructor() { }
}
