import {
  ChangeDetectionStrategy,
  Component,
  input,
  inject,
  resource,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { VaccinationService } from 'src/app/services/events/vaccination/vaccination.service';
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
import { Vaccination } from 'src/app/model/events/vaccination';
@Component({
  selector: 'app-vaccination-list',
  templateUrl: './vaccination-list.page.html',
  styleUrls: ['./vaccination-list.page.scss'],
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
export class VaccinationListPage implements OnInit, OnDestroy {
  constructor() {
    addIcons({
      eyeOutline,
    });
  }

  readonly id = input.required<string>();
  private readonly vaccinationService = inject(VaccinationService);
  private readonly router = inject(Router);
  private readonly wsService = inject(WebSocketService);
  private unsubscribe: (() => void) | null = null;

  readonly vaccinationsResource = resource<Vaccination[], undefined>({
    loader: async () =>
      await this.vaccinationService.getAllVaccinations(this.id()),
  });

  ngOnInit() {
    // Registrar handler para mensajes de animals (las vacunaciones actualizan los animales)
    this.unsubscribe = this.wsService.onMessage('animals', () => {
      console.log('Actualizando lista de vacunaciones por WebSocket');
      this.vaccinationsResource.reload();
    });
  }

  ngOnDestroy() {
    // Desregistrar el handler cuando se destruye el componente
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  goToCreate() {
    this.router.navigate([`/animal/events/${this.id()}/vaccination/create`]);
  }

  reload() {
    this.vaccinationsResource.reload();
  }
}
