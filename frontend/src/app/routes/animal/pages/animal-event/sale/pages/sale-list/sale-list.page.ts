import {
  ChangeDetectionStrategy,
  Component,
  input,
  inject,
  resource,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { SaleService } from 'src/app/services/events/sale/sale.service';
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
import { Sale } from 'src/app/model/events/sale';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.page.html',
  styleUrls: ['./sale-list.page.scss'],
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
export class SaleListPage implements OnInit, OnDestroy {
  constructor() {
    addIcons({
      eyeOutline,
    });
  }
  readonly id = input.required<string>();

  private readonly saleService = inject(SaleService);
  private readonly router = inject(Router);
  private readonly wsService = inject(WebSocketService);
  private unsubscribe: (() => void) | null = null;

  readonly salesResource = resource<Sale[], undefined>({
    loader: async () => await this.saleService.getAllSales(this.id()),
  });

  ngOnInit() {
    // Registrar handler para mensajes de animals (las ventas actualizan los animales)
    this.unsubscribe = this.wsService.onMessage('animals', () => {
      console.log('Actualizando lista de ventas por WebSocket');
      this.salesResource.reload();
    });
  }

  ngOnDestroy() {
    // Desregistrar el handler cuando se destruye el componente
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  goToCreate() {
    this.router.navigate([`/animal/events/${this.id()}/sale/create`]);
  }

  reload() {
    this.salesResource.reload();
  }
}
