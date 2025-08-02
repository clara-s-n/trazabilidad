import { Component, inject, OnInit, resource } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    RouterLink,
  ],
})
export class ListPage implements OnInit {
  private animalService = inject(AnimalService);
  // private modalController: ModalController = inject(ModalController);

  public animalesSignal = resource({
    loader: () => this.animalService.getAllAnimals(),
  });

  constructor() {}

  ngOnInit() {
    this.loadAnimals();
  }
  async loadAnimals() {
    const data = await this.animalService.getAllAnimals();
    this.animalesSignal.set(data);
  }

  // async confirmDelete(animal: Animal) {
  //   const modal = await this.modalController.create({
  //     component: DeleteAnimalModalComponent,
  //     componentProps: { animal },
  //   });
  //   await modal.present();
  //   const { data } = await modal.onWillDismiss();
  //   if (data?.confirm) {
  //     await this.deleteAnimal(animal.id);
  //   }
  // }

  async deleteAnimal(id: string) {
    await this.animalService.deleteAnimal({ animal_id: id });
    this.loadAnimals();
  }
}
