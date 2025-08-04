import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { AnimalFormComponent } from '../components/animal-form/animal-form.component';
import { AnimalService } from 'src/app/services/animal.service';
import { AnimalPost, UpdateAnimal } from 'src/app/model/animal';

@Component({
  selector: 'app-animal-create',
  standalone: true,
  imports: [
    AnimalFormComponent,
    IonTitle,
    IonBackButton,
    IonButtons,
    IonToolbar,
    IonHeader,
  ],
  templateUrl: './animal-create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class AnimalCreatePage {
  private animalService = inject(AnimalService);
  private router = inject(Router);

  /** Acepta payload de creación o edición, pero crea sólo CreateLandParams */
  async handleSave(payload: AnimalPost | UpdateAnimal) {
    // Para creación, payload incluirá todos los campos obligatorios
    await this.animalService.postAnimal(payload as AnimalPost);
    this.router.navigate(['/animals/list']);
  }
}
