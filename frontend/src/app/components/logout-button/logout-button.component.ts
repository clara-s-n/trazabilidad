import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOutOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout-button',
  template: `
    <ion-button fill="clear" (click)="confirmLogout()">
      <ion-icon slot="icon-only" name="log-out-outline"></ion-icon>
    </ion-button>
  `,
  standalone: true,
  imports: [IonButton, IonIcon],
})
export class LogoutButtonComponent {
  private authService = inject(AuthService);
  private alertController = inject(AlertController);

  constructor() {
    addIcons({ logOutOutline });
  }

  async confirmLogout() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          role: 'confirm',
          handler: () => {
            this.authService.logout();
          },
        },
      ],
    });

    await alert.present();
  }
}
