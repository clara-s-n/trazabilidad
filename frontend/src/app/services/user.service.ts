import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserPost } from '../model/user';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public httpCliente = inject(HttpClient);
  public apiUrl = environment.apiUrl;

  constructor() {}

  async postUser(data: UserPost) {
    const url = this.apiUrl + 'users/';
    return await firstValueFrom(this.httpCliente.post<UserPost>(url, data));
  }

  async uploadPhoto(formData: FormData) {
    console.log(`form data del servicio: ${formData}`);
    return await firstValueFrom(
      this.httpCliente.put(`${this.apiUrl}photo/`, formData)
    );
  }

  async getPhoto(data: string): Promise<ArrayBuffer> {
    return await firstValueFrom(
      this.httpCliente.get(`${this.apiUrl}photo/${data}`, {
        responseType: 'arraybuffer' as const,
      })
    );
  }
}
