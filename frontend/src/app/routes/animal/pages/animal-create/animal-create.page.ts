import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { AnimalFormComponent } from '../../components/animal-form/animal-form.component';
import { AnimalService } from 'src/app/services/animal.service';
import { AnimalPost } from 'src/app/model/animal';

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
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
  ],
  templateUrl: './animal-create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class AnimalCreatePage {
  private animalService = inject(AnimalService);
  private router = inject(Router);

  async handleSave(payload: AnimalPost) {
    try {
      const createdAnimal = await this.animalService.postAnimal(payload);
      // Redirect to the created animal's detail page
      this.router.navigate(['/animal', createdAnimal.id]);
    } catch (error) {
      console.error('Error creating animal:', error);
    }
  }

  onCancel() {
    this.router.navigate(['/animal/list']);
  }
}
