import { CommonModule } from '@angular/common';
import { Component, inject, resource } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  eyeOutline,
  pencilOutline,
  homeOutline,
} from 'ionicons/icons';
import { Animal } from 'src/app/model/animal';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.page.html',
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
export class ListPage {
  constructor() {
    addIcons({
      eyeOutline,
      pencilOutline,
      addOutline,
      homeOutline,
    });
  }

  private animalService = inject(AnimalService);
  private router = inject(Router);

  public animalsResource = resource({
    loader: async () => await this.animalService.getAllAnimals(),
  });

  goToSpecificAnimal(animal: Animal) {
    this.router.navigate([`/animal/${animal.id}`]);
  }

  goToEdit(animal: Animal) {
    this.router.navigate([`/animal/edit/${animal.id}`]);
  }

  goToCreate() {
    this.router.navigate(['/animal/create']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  reload() {
    this.animalsResource.reload();
  }
}
