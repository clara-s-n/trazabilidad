import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, resource, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Land } from '../../../../model/land';
import { LandsService } from '../../../../services/lands.service';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  ModalController,
} from '@ionic/angular/standalone';
import { DeleteLandModalComponent } from '../../components/delete-land-modal/delete-land-modal.component';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  locationOutline,
  eyeOutline,
  createOutline,
  trashOutline,
  addOutline,
  pencilOutline,
  homeOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-land-list',
  templateUrl: './land-list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonSpinner,
    IonRow,
    IonIcon,
    IonCol,
    IonFab,
    IonFabButton,
    IonGrid,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonLabel,
  ],
})
export class ListPage implements OnInit {
  socket = new WebSocket('ws://localhost/backend/');

  public lands = signal<Land[]>([]);

  private landService: LandsService = inject(LandsService);
  private modalController: ModalController = inject(ModalController);
  private router = inject(Router);
  private title = inject(Title);

  public landsResource = resource({
    loader: async () => await this.landService.getAllLands(),
  });

  constructor() {
    addIcons({
      locationOutline,
      eyeOutline,
      createOutline,
      trashOutline,
      addOutline,
      pencilOutline,
      homeOutline,
    });
  }

  ngOnInit() {
    this.title.setTitle('Lista de Predios | Sistema de Trazabilidad');
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

  goToSpecificLand(land: Land) {
    this.router.navigate([`/land/${land.id}`]);
  }

  goToEdit(land: Land) {
    this.router.navigate([`/land/edit/${land.id}`]);
  }

  goToCreate() {
    this.router.navigate(['/land/create']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  reload() {
    this.landsResource.reload();
  }
}
