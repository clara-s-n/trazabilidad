import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class MainStoreService {
  
  public usuario?: User;

  constructor() { }
}
