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

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
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
    try {
      return await firstValueFrom(
        this.httpCliente.get<AnimalMovementWithLands[]>(
          `${this.apiUrl}/animals/${animalId}/movements`
        )
      );
    } catch (error) {
      console.error('Error fetching animal movements:', error);
      throw error;
    }
  }

  /**
   * Retrieves list of all animal species (breeds)
   */
  async getSpeciesList(): Promise<string[]> {
    try {
      // Extract unique breeds from all animals
      const animals = await this.getAllAnimals();
      const breeds = [...new Set(animals.map(animal => animal.breed))].sort();
      return breeds;
    } catch (error) {
      console.error('Error fetching species list:', error);
      throw error;
    }
  }

  /**
   * Retrieves list of all available regions (based on land locations)
   */
  async getRegions(): Promise<string[]> {
    try {
      // Import LandsService to get regions from lands
      const { LandsService } = await import('./lands.service');
      const landsService = new LandsService();
      
      try {
        const lands = await landsService.getAllLands();
        
        // Generate regions based on geographic coordinates
        const regions = new Set<string>();
        
        lands.forEach(land => {
          const lat = land.latitude;
          const lng = land.longitude;
          
          // Basic regional classification for Uruguay
          if (lat > -32.5) {
            regions.add('Norte');
          } else if (lat < -34.5) {
            regions.add('Sur');
          } else {
            regions.add('Centro');
          }
          
          if (lng > -56) {
            regions.add('Este');
          } else {
            regions.add('Oeste');
          }
        });
        
        return Array.from(regions).sort();
      } catch (error) {
        console.warn('Could not fetch lands for regions, using fallback');
        // Fallback to static regions if lands service fails
        return ['Norte', 'Sur', 'Este', 'Oeste', 'Centro'];
      }
    } catch (error) {
      console.error('Error fetching regions:', error);
      // Ultimate fallback
      return ['Norte', 'Sur', 'Este', 'Oeste', 'Centro'];
    }
  }

  /**
   * Gets animals with optional filtering
   */
  async getAnimalsWithFilters(filters?: {
    species?: string;
    region?: string;
    fromDate?: string;
    toDate?: string;
  }): Promise<Animal[]> {
    try {
      let animals = await this.getAllAnimals();
      
      // Apply client-side filtering
      if (filters) {
        if (filters.species) {
          animals = animals.filter(animal => animal.breed === filters.species);
        }
        
        if (filters.region) {
          // TODO: Filter by region when land data is available in animal objects
          // For now, this filter won't apply
        }
        
        if (filters.fromDate && filters.toDate) {
          const fromDate = new Date(filters.fromDate);
          const toDate = new Date(filters.toDate);
          animals = animals.filter(animal => {
            const animalDate = new Date(animal.birth_date);
            return animalDate >= fromDate && animalDate <= toDate;
          });
        }
      }
      
      return animals;
    } catch (error) {
      console.error('Error fetching filtered animals:', error);
      throw error;
    }
  }

  async getCurrentTag(animalId: string): Promise<any | null> {
    return await firstValueFrom(
      this.httpCliente.get<any>(`${this.apiUrl}animals/${animalId}/current-tag`)
    );
  }
}
