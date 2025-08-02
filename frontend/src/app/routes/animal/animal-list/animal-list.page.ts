import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, resource } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline } from 'ionicons/icons';
import { Animal } from 'src/app/model/animal';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonSpinner,
    IonText,
    IonButton,
    IonRow,
    IonIcon,
    IonCol,
  ],
})
export class ListPage {
  constructor() {
    addIcons({
      eyeOutline,
    });
  }
  private animalService = inject(AnimalService);
  private router = inject(Router);

  public animalsResource = resource({
    loader: async () => await this.animalService.getAllAnimals(),
  });

  goToSpecificAnimal(animal: Animal) {
    console.log(
      `${animal.birth_date}, ${animal.breed}, ${animal.created_at}, ${animal.status},  ${animal.land_id},  ${animal.owner_id},  ${animal.updated_at}`
    );
    console.log(`Navigating to user profile with ID: ${animal.id} `);
    this.router.navigate([`/animal/${animal.id}`]);
  }

  reload() {
    window.location.reload();
  }

  goToAnimalModification(animal: Animal) {
    console.log(`Navigating to user edit with ID: ${animal.id}`);
    this.router.navigate([`/animal/edit/${animal.id}`]);
  }
}
