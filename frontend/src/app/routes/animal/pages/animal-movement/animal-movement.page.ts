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
import { AnimalMovementSchema } from 'src/app/model/animal';

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
export class MovementPage {
  constructor() {
    addIcons({
      eyeOutline,
    });
  }
  readonly id = input.required<string>();

  private readonly animalService = inject(AnimalService);
  private readonly router = inject(Router);

  readonly animalMovementsResource = resource<
    AnimalMovementSchema[],
    undefined
  >({
    loader: async () =>
      await this.animalService.getAllAnimalMovments(this.id()),
  });

  goToMovement() {
    this.router.navigate([`/animal/movements/${this.id()}`]);
  }

  reload() {
    window.location.reload();
  }
}
