import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Animal } from '../model/animal';
import { AnimalPost } from '../model/animalPost';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor() { }

  public httpCliente = inject(HttpClient);
  public apiUrl = environment.apiUrl;

  async getAll() {
    const url = this.apiUrl + "animals/"
    return await firstValueFrom(this.httpCliente.get<Animal>(url));
  }

  async postAnimal(data: AnimalPost) {
    const url = this.apiUrl + "animals/"
    return await firstValueFrom(this.httpCliente.post<Animal>(url, data));
  }
}