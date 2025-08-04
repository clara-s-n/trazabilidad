import {
  ChangeDetectionStrategy,
  Component,
  input,
  inject,
  resource,
} from '@angular/core';
import { AnimalService } from 'src/app/services/animal.service';
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
import { AnimalHistorySchema } from 'src/app/model/animal';
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
export class HistoryPage {
  constructor() {
    addIcons({
      eyeOutline,
    });
  }
  readonly id = input.required<string>();

  private readonly animalService = inject(AnimalService);
  private readonly router = inject(Router);

  readonly animalModificationsResource = resource<
    AnimalHistorySchema[],
    undefined
  >({
    loader: async () =>
      await this.animalService.getAllAnimalModification(this.id()),
  });

  goToModify() {
    this.router.navigate([`/animal/edit/${this.id()}`]);
  }

  reload() {
    window.location.reload();
  }
}
