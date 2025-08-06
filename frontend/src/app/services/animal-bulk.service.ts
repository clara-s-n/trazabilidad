import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Animal, AnimalPost } from '../model/animal';

export interface BulkAnimalCreate extends AnimalPost {
  row_id?: number;
}

export interface BulkAnimalUpdate {
  animal_ids: string[];
  updates: {
    breed?: string;
    owner_id?: string;
    land_id?: string;
    status?: string;
  };
}

export interface BulkOperationResult {
  success: boolean;
  total_processed: number;
  successful: number;
  failed: number;
  created_animals?: Animal[];
  updated_animals?: Animal[];
  errors: Array<{
    row_id?: number;
    animal_id?: string;
    field?: string;
    message: string;
    code: string;
  }>;
}

export interface BulkValidationInfo {
  owners: Array<{ id: string; email: string }>;
  lands: Array<{ id: string; name: string }>;
  statuses: Array<{ key: string; label_es: string; label_en: string }>;
  breeds: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AnimalBulkService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}animals/bulk/`;

  /**
   * Create multiple animals in bulk
   */
  async bulkCreateAnimals(animals: BulkAnimalCreate[]): Promise<BulkOperationResult> {
    return firstValueFrom(
      this.http.post<BulkOperationResult>(`${this.apiUrl}create`, animals)
    );
  }

  /**
   * Update multiple animals with shared field values
   */
  async bulkUpdateAnimals(update: BulkAnimalUpdate): Promise<BulkOperationResult> {
    return firstValueFrom(
      this.http.put<BulkOperationResult>(`${this.apiUrl}update`, update)
    );
  }

  /**
   * Get validation information for bulk operations
   */
  async getBulkValidationInfo(): Promise<BulkValidationInfo> {
    return firstValueFrom(
      this.http.get<BulkValidationInfo>(`${this.apiUrl}validation-info`)
    );
  }
}
