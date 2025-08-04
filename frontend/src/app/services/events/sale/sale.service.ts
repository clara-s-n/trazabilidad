// sale.service.ts
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Sale, SaleCreate } from 'src/app/model/events/sale';
import { environment } from 'src/environments/environment';

/**
 * Servicio para operaciones CRUD de ventas
 */
@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}animals/`;

  /** Obtiene todas las ventas de un animal */
  async getAllSales(animalId: string): Promise<Sale[]> {
    return firstValueFrom(
      this.http.get<Sale[]>(`${this.baseUrl}sales/${animalId}`)
    );
  }

  /** Crea una nueva venta para un animal */
  async createSale(animalId: string, data: SaleCreate): Promise<SaleCreate> {
    return firstValueFrom(
      this.http.post<SaleCreate>(`${this.baseUrl}sales/${animalId}`, data)
    );
  }
}
