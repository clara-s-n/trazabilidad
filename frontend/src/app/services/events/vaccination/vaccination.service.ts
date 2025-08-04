import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  Vaccination,
  VaccinationCreate,
} from 'src/app/model/events/vaccination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VaccinationService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}animals/`;

  async getAllVaccinations(id: string): Promise<Vaccination[]> {
    return firstValueFrom(
      this.http.get<Vaccination[]>(`${this.baseUrl}vaccinations/${id}`)
    );
  }

  async createVaccination(
    id: string,
    data: VaccinationCreate
  ): Promise<VaccinationCreate> {
    return firstValueFrom(
      this.http.post<VaccinationCreate>(
        `${this.baseUrl}vaccinations/${id}`,
        data
      )
    );
  }
}
