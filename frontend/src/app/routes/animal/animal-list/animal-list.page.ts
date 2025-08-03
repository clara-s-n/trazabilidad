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
import { Animal, AnimalParams, CompleteAnimal } from 'src/app/model/animal';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.page.html',
  styleUrls: ['./list.page.scss'],
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
    console.log('Animal:', animal);
    console.log(`Navigating to animal profile with ID: ${animal.animal_id} `);
    this.router.navigate([`/animal/${animal.animal_id}`]);
  }

  reload() {
    window.location.reload();
  }
/*
  goToAnimalModification(animal: Animal) {
    console.log(`Navigating to animal edit with ID: ${animal.animal_id}`);
    this.router.navigate([`/animal/edit/${animal.animal_id}`]);
  }*/
}
