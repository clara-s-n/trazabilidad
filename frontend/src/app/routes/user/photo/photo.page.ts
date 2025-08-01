import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { MainStoreService } from 'src/app/services/main-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
  standalone: true,
})
export class PhotoPage {
  private userService = inject(UserService);

  public photos = signal<ArrayBuffer | undefined>(undefined);
  public src = computed(() => {
    const buf = this.photos();
    if (!buf) return null;
    // Creamos un Blob con el tipo correcto
    const blob = new Blob([buf], { type: 'image/jpeg' });
    // Generamos un URL temporal
    const objectUrl = URL.createObjectURL(blob);
  });

  /**
   * Invoca al servicio y gestiona la promesa con firstValueFrom,
   * actualizando las señales de estado.
   */
  load(): void {}

  //private email = localStorage.getItem(`userEmail`);
  private email = `aaaa`;

  async ionViewWillEnter() {
    if (!this.email) {
      return;
    }
    await this.userService.getPhoto(this.email);
  }
}
