// src/app/services/lands.service.ts

import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  Land,
  CreateLand,
  UpdateLand,
  LandParams
} from '../model/land';

@Injectable({
  providedIn: 'root'
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
    return firstValueFrom(this.http.delete<void>(`${this.baseUrl}/${params.land_id}`));
  }
}
