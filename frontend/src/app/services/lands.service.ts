// src/app/services/lands.service.ts

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Land, CreateLand, UpdateLand, LandParams } from '../model/land';
import { Animal } from '../model/animal';

@Injectable({
  providedIn: 'root',
})
export class LandsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}lands`; // Asegúrate que coincide con tu prefijo en backend

  /** GET /predios → listado completo */
  async getAllLands(): Promise<Land[]> {
    return firstValueFrom(this.http.get<Land[]>(`${this.baseUrl}/`));
  }

  /** GET /predios/:id → un solo predio */
  async getLand(id: string): Promise<Land> {
    return firstValueFrom(this.http.get<Land>(`${this.baseUrl}/${id}`));
  }

  /** POST /predios → crea y devuelve el nuevo predio */
  async createLand(data: CreateLand): Promise<Land> {
    return firstValueFrom(this.http.post<Land>(`${this.baseUrl}/`, data));
  }

  /** PUT /predios/:id → actualiza y devuelve el predio modificado */
  async updateLand(id: string, data: UpdateLand): Promise<Land> {
    return firstValueFrom(this.http.put<Land>(`${this.baseUrl}/${id}`, data));
  }

  /** DELETE /predios/:id → no devuelve contenido */
  async deleteLand(params: LandParams): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.baseUrl}/${params.land_id}`)
    );
  }

  /** GET /predios/:id/animals → obtiene animales del predio */
  async getLandAnimals(id: string): Promise<Animal[]> {
    return firstValueFrom(
      this.http.get<Animal[]>(`${this.baseUrl}/${id}/animals`)
    );
  }

  /** Check if a land name already exists */
  async checkLandNameExists(
    name: string,
    excludeId?: string
  ): Promise<boolean> {
    try {
      const lands = await this.getAllLands();
      return lands.some(
        (land) =>
          land.name.toLowerCase() === name.toLowerCase() &&
          land.id !== excludeId
      );
    } catch (error) {
      console.error('Error checking land name existence:', error);
      return false;
    }
  }
}
