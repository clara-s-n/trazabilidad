import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Animal, CompleteAnimal } from '../model/animal';
import { AnimalParams, AnimalPost, UpdateAnimal } from '../model/animal';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  constructor() { }

  public httpCliente = inject(HttpClient);
  public apiUrl = environment.apiUrl;

  async getAllAnimals(): Promise<Animal[]> {
    return await firstValueFrom(
      this.httpCliente.get<Animal[]>(this.apiUrl + 'animals/')
    );
  }

  async getAnimal(animalId: string): Promise<Animal> {
    return await firstValueFrom(
      this.httpCliente.get<Animal>(`${this.apiUrl}animals/${animalId}`)
    );
  }

  async getCompleteAnimal(animalId: string): Promise<CompleteAnimal> {
    return await firstValueFrom(
      this.httpCliente.get<CompleteAnimal>(`${this.apiUrl}animals/${animalId}`)
    );
  }

  async postAnimal(data: AnimalPost): Promise<Animal> {
    const url = this.apiUrl + 'animals/';
    return await firstValueFrom(this.httpCliente.post<Animal>(url, data));
  }

  async updateAnimal(id: string, data: UpdateAnimal): Promise<Animal> {
    return await firstValueFrom(
      this.httpCliente.put<Animal>(`${this.apiUrl}animals/${id}`, data)
    );
  }

  async deleteAnimal(params: AnimalParams): Promise<void> {
    return await firstValueFrom(
      this.httpCliente.delete<void>(`${this.apiUrl}animals/${params.animal_id}`)
    );
  }
}
