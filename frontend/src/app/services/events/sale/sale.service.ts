import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Sale, SaleCreate } from 'src/app/model/events/sale';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}animals/`;

  async getAllSales(id: string): Promise<Sale[]> {
    return firstValueFrom(this.http.get<Sale[]>(`${this.baseUrl}sales/${id}`));
  }

  /** POST /predios → crea y devuelve el nuevo predio */
  async createLand(id: string, data: SaleCreate): Promise<SaleCreate> {
    return firstValueFrom(
      this.http.post<SaleCreate>(`${this.baseUrl}sales/${id}`, data)
    );
  }
}
