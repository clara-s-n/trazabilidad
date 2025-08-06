import {
  ChangeDetectionStrategy,
  Component,
  input,
  inject,
  resource,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AnimalService } from 'src/app/services/animal.service';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/services/websocket.service';

import {
  IonHeader,
  IonButtons,
  IonToolbar,
  IonTitle,
  IonButton,
  IonContent,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSpinner,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline } from 'ionicons/icons';
import { AnimalHistorySchema, AnimalHistoryWithUser } from 'src/app/model/animal';
@Component({
  selector: 'app-animal-history',
  templateUrl: './animal-history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonContent,
    IonList,
    IonCard,
    IonButtons,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSpinner,
    IonText,
  ],
})
export class HistoryPage implements OnInit, OnDestroy {
  constructor() {
    addIcons({
      eyeOutline,
    });
  }
  readonly id = input.required<string>();

  private readonly animalService = inject(AnimalService);
  private readonly router = inject(Router);
  private readonly wsService = inject(WebSocketService);
  private unsubscribe: (() => void) | null = null;

  readonly animalModificationsResource = resource<
    AnimalHistoryWithUser[],
    undefined
  >({
    loader: async () =>
      await this.animalService.getAllAnimalModification(this.id()),
  });

  ngOnInit() {
    // Registrar handler para mensajes de animals (cambios en animales generan historial)
    this.unsubscribe = this.wsService.onMessage('animals', () => {
      console.log('Actualizando historial de animal por WebSocket');
      this.animalModificationsResource.reload();
    });
  }

  ngOnDestroy() {
    // Desregistrar el handler cuando se destruye el componente
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  goToModify() {
    this.router.navigate([`/animal/edit/${this.id()}`]);
  }

  reload() {
    this.animalModificationsResource.reload();
  }
}
