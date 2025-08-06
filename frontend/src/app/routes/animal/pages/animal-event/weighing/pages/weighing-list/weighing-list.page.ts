import {
  ChangeDetectionStrategy,
  Component,
  input,
  inject,
  resource,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { WeighingService } from 'src/app/services/events/weighing/weighing.service';
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
import { Weighing } from 'src/app/model/events/weighing';

@Component({
  selector: 'app-weighing-list',
  templateUrl: './weighing-list.page.html',
  styleUrls: ['./weighing-list.page.scss'],
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
export class WeighingListPage implements OnInit, OnDestroy {
  constructor() {
    addIcons({
      eyeOutline,
    });
  }
  readonly id = input.required<string>();

  private readonly weighingService = inject(WeighingService);
  private readonly router = inject(Router);
  private readonly wsService = inject(WebSocketService);
  private unsubscribe: (() => void) | null = null;

  readonly weighingsResource = resource<Weighing[], undefined>({
    loader: async () => await this.weighingService.getAllWeighings(this.id()),
  });

  ngOnInit() {
    // Registrar handler para mensajes de animals (los pesajes actualizan los animales)
    this.unsubscribe = this.wsService.onMessage('animals', () => {
      console.log('Actualizando lista de pesajes por WebSocket');
      this.weighingsResource.reload();
    });
  }

  ngOnDestroy() {
    // Desregistrar el handler cuando se destruye el componente
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  goToCreate() {
    this.router.navigate([`/animal/events/${this.id()}/weighing/create`]);
  }

  reload() {
    this.weighingsResource.reload();
  }
}
