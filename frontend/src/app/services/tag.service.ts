import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class TagService {
  private http: HttpClient = inject(HttpClient);
  public apiUrl = environment.apiUrl;
  public tagsUrl = `${this.apiUrl}tags/`;
  public specificTagsUrl = `${this.apiUrl}tags/tag_id/`;

  constructor() { }

  async getAllTags() {
    return await firstValueFrom(this.http.get<any[]>(`${this.tagsUrl}`));
  }

  async getTagsByAnimal(animalId: string) {
    return await firstValueFrom(this.http.get<any[]>(`${this.tagsUrl}${animalId}`));
  }

  async assignTagToAnimal(tagId: string, animalId: string) {
    return await firstValueFrom(this.http.post(`${this.specificTagsUrl}${tagId}/assign/${animalId}`, {}));
  }

  async unassignTagFromAnimal(animalId: string, tagId: string) {
    return await firstValueFrom(this.http.put(`${this.specificTagsUrl}${tagId}/${animalId}`, {}));
  }

  async updateTagStatus(tagId: string, newStatus: string) {
    return await firstValueFrom(this.http.put(`${this.specificTagsUrl}${tagId}`, { status: newStatus }));
  }

  async changeAnimalTag(animalId: string, oldTagId: string, newTagId: string): Promise<any> {
    return await firstValueFrom(
      this.http.put(
        `${this.specificTagsUrl}${oldTagId}/${animalId}/change`,
        { tag_id: newTagId }
      )
    );
  }
}
