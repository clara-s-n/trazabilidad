import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Animal } from '../model/animal';
import { AnimalParams, AnimalPost, UpdateAnimal } from '../model/animalPost';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  constructor() {}

  public httpCliente = inject(HttpClient);
  public apiUrl = `${environment.apiUrl}animals`;

  async getAllAnimals() {
    return firstValueFrom(this.httpCliente.get<Animal>(`${this.apiUrl}/`));
  }

  async getAnimal(id: string): Promise<Animal> {
    return firstValueFrom(this.httpCliente.get<Animal>(`${this.apiUrl}/${id}`));
  }

  async postAnimal(id: string, data: AnimalPost): Promise<Animal> {
    return firstValueFrom(
      this.httpCliente.post<Animal>(`${this.apiUrl}/${id}/`, data)
    );
  }

  async updateAnimal(id: string, data: UpdateAnimal): Promise<Animal> {
    return firstValueFrom(
      this.httpCliente.put<Animal>(`${this.apiUrl}/${id}`, data)
    );
  }

  async deleteAnimal(params: AnimalParams): Promise<void> {
    return firstValueFrom(
      this.httpCliente.delete<void>(`${this.apiUrl}/${params.animal_id}`)
    );
  }
}
