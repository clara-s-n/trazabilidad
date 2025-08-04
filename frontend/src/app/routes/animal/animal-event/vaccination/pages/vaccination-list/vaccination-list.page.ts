import {
  ChangeDetectionStrategy,
  Component,
  input,
  inject,
  resource,
} from '@angular/core';
import { VaccinationService } from 'src/app/services/events/vaccination/vaccination.service';
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
export class VaccinationListPage {
  constructor() {
    addIcons({
      eyeOutline,
    });
  }

  readonly id = input.required<string>();
  private readonly vaccinationService = inject(VaccinationService);
  private readonly router = inject(Router);

  readonly vaccinationsResource = resource<Vaccination[], undefined>({
    loader: async () =>
      await this.vaccinationService.getAllVaccinations(this.id()),
  });

  goToCreate() {
    this.router.navigate([`/animal/events/${this.id()}/vaccination/create`]);
  }

  reload() {
    window.location.reload();
  }
}
