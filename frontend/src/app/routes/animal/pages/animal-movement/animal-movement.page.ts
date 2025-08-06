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
import { AnimalMovementSchema, AnimalMovementWithLands } from 'src/app/model/animal';

@Component({
  selector: 'app-animal-movement',
  templateUrl: './animal-movement.page.html',
  styleUrls: ['./movement.page.scss'],
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
export class MovementPage implements OnInit, OnDestroy {
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

  readonly animalMovementsResource = resource<
    AnimalMovementWithLands[],
    undefined
  >({
    loader: async () =>
      await this.animalService.getAllAnimalMovments(this.id()),
  });

  ngOnInit() {
    // Registrar handler para mensajes de transports (movimientos están relacionados con transportes)
    this.unsubscribe = this.wsService.onMessage('transports', () => {
      console.log('Actualizando movimientos de animal por WebSocket');
      this.animalMovementsResource.reload();
    });
  }

  ngOnDestroy() {
    // Desregistrar el handler cuando se destruye el componente
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  goToMovement() {
    this.router.navigate([`/animal/movements/${this.id()}`]);
  }

  reload() {
    this.animalMovementsResource.reload();
  }
}
