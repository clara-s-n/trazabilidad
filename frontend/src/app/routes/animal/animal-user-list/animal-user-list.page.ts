import { CommonModule } from '@angular/common';
import { Component, inject, input, resource } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonButtons,
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
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-animal-user-list',
  templateUrl: './animal-user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
  imports: [
    CommonModule,
    IonButtons,
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
export class UserListPage {
  constructor() {
    addIcons({
      eyeOutline,
    });
  }
  private userService = inject(UserService);
  private animalService = inject(AnimalService);
  private router = inject(Router);

  readonly userId = input.required<string>();
  /*readonly animal_id = input.required<string>();

  public animalsResource = resource({
    loader: async () => await this.animalService.getAnimal(this.animal_id()),
  });*/

  public userAnimalsResource = resource({
    params: () => ({ id: this.userId() }),
    loader: async ({ params }) => await this.userService.getUserAnimals(params.id),
  });

  ngOnInit() {
    console.log(`User ID: ${this.userId()}`);
    console.log(`Animals for User ID: ${this.userAnimalsResource.value()}`);
  }

  goToSpecificAnimal(animal_id: Animal) {
    console.log('Animal:');
    console.log(`Navigating to animal profile with ID: ${animal_id} `);
    this.router.navigate([`/animal/${animal_id.id}`]);
  }

  goToCreate() {
    this.router.navigate(['/animal/create']);
  }

  reload() {
    window.location.reload();
  }

  goToAnimalModification(animal_id: Animal) {
    console.log(`Navigating to animal edit with ID: ${animal_id.id}`);
    this.router.navigate([`/animal/edit/${animal_id.id}`]);
  }
}
