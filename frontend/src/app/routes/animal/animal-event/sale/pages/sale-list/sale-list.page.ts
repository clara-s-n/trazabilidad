import {
  ChangeDetectionStrategy,
  Component,
  input,
  inject,
  resource,
} from '@angular/core';
import { SaleService } from 'src/app/services/events/sale/sale.service';
import { Router } from '@angular/router';

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
export class SaleListPage {
  constructor() {
    addIcons({
      eyeOutline,
    });
  }
  readonly id = input.required<string>();

  private readonly saleService = inject(SaleService);
  private readonly router = inject(Router);

  readonly salesResource = resource<Sale[], undefined>({
    loader: async () => await this.saleService.getAllSales(this.id()),
  });

  goToCreate() {
    this.router.navigate([`/animal/events/${this.id()}/sale/create`]);
  }

  reload() {
    window.location.reload();
  }
}
