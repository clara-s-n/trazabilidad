import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Animal,
  AnimalHistorySchema,
  AnimalHistoryWithUser,
  AnimalMovementSchema,
  AnimalMovementWithLands,
  CompleteAnimal,
} from '../model/animal';
import { AnimalParams, AnimalPost, UpdateAnimal } from '../model/animal';
import { TagService } from './tag.service';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private tagService = inject(TagService);
  constructor() {}

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

  async getAllAnimalModification(
    animalId: string
  ): Promise<AnimalHistoryWithUser[]> {
    return await firstValueFrom(
      this.httpCliente.get<AnimalHistoryWithUser[]>(
        `${this.apiUrl}animals/${animalId}/modifications`
      )
    );
  }

  async getAllAnimalMovments(
    animalId: string
  ): Promise<AnimalMovementWithLands[]> {
    return await firstValueFrom(
      this.httpCliente.get<AnimalMovementWithLands[]>(
        `${this.apiUrl}animals/${animalId}/movements`
      )
    );
  }

  async getCurrentTag(animalId: string): Promise<any | null> {
    try {
      return await firstValueFrom(
        this.httpCliente.get<any>(`${this.apiUrl}animals/${animalId}/current-tag`)
      );
    } catch (error: any) {
      // If 404, pass it on so component can handle it appropriately
      if (error.status === 404) {
        throw error;
      }
      console.error('Error fetching current tag:', error);
      return null;
    }
  }

  async createAnimal(animalData: AnimalPost & { tag_id?: string }): Promise<Animal> {
  // If there's a tag_id, we need to handle it
  const { tag_id, ...animalPayload } = animalData;
  
  // First create the animal
  const createdAnimal = await firstValueFrom(
    this.httpCliente.post<Animal>(`${this.apiUrl}animals/`, animalPayload)
  ); 
  if (tag_id) {
    try {
      // Assign the tag to the newly created animal
      await this.tagService.assignTagToAnimal(tag_id, createdAnimal.id);
      return createdAnimal;
    } catch (error) {
      console.error('Error assigning tag:', error);
      // Optionally, you might want to delete the created animal if tag assignment fails
      // await this.deleteAnimal({ animal_id: createdAnimal.id });
      throw error; // Rethrow or handle as needed
    }
  }

  return createdAnimal;
}

  async getAnimalStatuses(): Promise<any[]> {
    return await firstValueFrom(
      this.httpCliente.get<any[]>(`${this.apiUrl}animals/statuses`)
    );
  }
}
