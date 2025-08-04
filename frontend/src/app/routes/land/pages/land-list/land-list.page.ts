import { Component, inject, OnInit, signal } from '@angular/core';
import { Land } from '../../../../model/land';
import { LandsService } from '../../../../services/lands.service';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { DeleteLandModalComponent } from '../../components/delete-land-modal/delete-land-modal.component';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  locationOutline,
  eyeOutline,
  createOutline,
  trashOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-land-list',
  templateUrl: './land-list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonText,
    RouterLink,
  ],
})
export class ListPage implements OnInit {
  socket = new WebSocket('ws://localhost/backend/');

  public lands = signal<Land[]>([]);

  private landService: LandsService = inject(LandsService);
  private modalController: ModalController = inject(ModalController);

  constructor() {
    addIcons({
      locationOutline,
      eyeOutline,
      createOutline,
      trashOutline,
    });
  }

  ngOnInit() {
    this.loadLands();

    this.socket.addEventListener('open', (event) => {
      // Si quiero hacer algo al establecer la conexión.
    });

    this.socket.addEventListener('message', (event) => {
      console.log('Mensaje del servidor: ', event.data);
      if (event.data === 'newLand') {
        this.loadLands();
      }
      // window.location.reload();
    });
  }
  async loadLands() {
    const data = await this.landService.getAllLands();
    this.lands.set(data);
  }

  async confirmDelete(land: Land) {
    const modal = await this.modalController.create({
      component: DeleteLandModalComponent,
      componentProps: { land },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.confirm) {
      await this.deleteLand(land.id);
    }
  }

  async deleteLand(id: string) {
    await this.landService.deleteLand({ land_id: id });
    this.loadLands();
  }

  // Helper method to format coordinates
  formatCoordinate(value: number, isLatitude: boolean): string {
    const direction = isLatitude
      ? value >= 0
        ? 'N'
        : 'S'
      : value >= 0
      ? 'E'
      : 'W';
    return `${Math.abs(value).toFixed(4)}° ${direction}`;
  }
}
