import { Component, inject, input, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalFormComponent } from '../../components/animal-form/animal-form.component';
import {
  IonSpinner,
  IonText,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
} from '@ionic/angular/standalone';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.page.html',
  standalone: true,
  imports: [
    AnimalFormComponent,
    IonSpinner,
    IonText,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
  ],
})
export class AnimalEditPage implements OnInit {
  private animalService = inject(AnimalService);
  private router = inject(Router);

  public animal_id = input.required<string>();

  animal = signal<any | null>(null);
  loading = signal<boolean>(false);

  async ngOnInit() {
    await this.loadAnimal();
  }

  private async loadAnimal() {
    this.loading.set(true);
    const animalId = this.animal_id();
    if (animalId) {
      try {
        const animalData = await this.animalService.getAnimal(animalId);
        this.animal.set(animalData);
      } catch {
        this.animal.set(null);
      }
    }
    this.loading.set(false);
  }

  async onSubmit(data: {
    breed?: string;
    birth_date?: string;
    owner_id?: string;
    land_id?: string;
    status?: string;
  }) {
    try {
      await this.animalService.updateAnimal(this.animal_id(), data);
      // Redirect to detail page after successful update
      this.router.navigate(['/animal', this.animal_id()]);
    } catch (error) {
      console.error('Error al actualizar el animal:', error);
    }
  }

  onCancel() {
    // Go back to detail page
    this.router.navigate(['/animal', this.animal_id()]);
  }
}
