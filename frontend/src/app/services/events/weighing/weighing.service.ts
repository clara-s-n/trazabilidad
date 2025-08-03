import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Weighing, WeighingCreate } from 'src/app/model/events/weighing';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeighingService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}animals/`;

  async getAllWeighings(id: string): Promise<Weighing[]> {
    return firstValueFrom(
      this.http.get<Weighing[]>(`${this.baseUrl}weighings/${id}`)
    );
  }

  /** POST /predios → crea y devuelve el nuevo predio */
  async createWeighing(
    id: string,
    data: WeighingCreate
  ): Promise<WeighingCreate> {
    return firstValueFrom(
      this.http.post<WeighingCreate>(`${this.baseUrl}weighings/${id}`, data)
    );
  }
}
