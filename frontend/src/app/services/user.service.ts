import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, UserPost, UserUpdate } from '../model/user';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public httpClient = inject(HttpClient);
  public apiUrl = environment.apiUrl;

  constructor() { }

  async postUser(data: UserPost) {
    const url = this.apiUrl + "users/"
    return await firstValueFrom(this.httpClient.post<UserPost>(url, data));
  }

  async updateUser(userId: string, data: Partial<UserUpdate>) {
    return await firstValueFrom(this.httpClient.put<User>(`${this.apiUrl}users/${userId}`, data));
  }

  async deleteUser(userId: string) {
    return await firstValueFrom(this.httpClient.delete(`${this.apiUrl}users/${userId}`));
  }

  async getAllUsers(): Promise<User[]> {
    return await firstValueFrom(this.httpClient.get<User[]>(this.apiUrl + 'users/'));
  }

  async getUserById(userId: string): Promise<User> {
    return await firstValueFrom(this.httpClient.get<User>(`${this.apiUrl}users/${userId}`));
  }

}
