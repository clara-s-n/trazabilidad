// animal-edit.page.ts

import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject,
  input,
  resource,
} from '@angular/core';
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
import { Animal } from 'src/app/model/animal';

/**
 * Página de edición de animal.
 * Usa `resource()` para cargar el animal automáticamente desde la URL.
 */
@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.page.html',
  styleUrls: ['./edit.page.scss'],
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'animal-edit-page' },
})
export class AnimalEditPage {
  private readonly animalService = inject(AnimalService);
  private readonly router = inject(Router);

  id = input.required<string>();

  /** Recurso reactivo que carga el animal automáticamente */
  readonly animalResource = resource<Animal, undefined>({
    loader: async () => {
    const id = this.id();
    console.log(this.id)
    console.log(id)
    if (!id) throw new Error('ID no disponible');
    return await this.animalService.getAnimal(id);
  }});

  async onSubmit(data: {
    breed?: string;
    birth_date?: string;
    owner_id?: string;
    land_id?: string;
    status?: string;
  }) {
    try {
      await this.animalService.updateAnimal(this.id(), data);
      this.router.navigate(['/animal', this.id()]);
    } catch (error) {
      console.error('Error al actualizar el animal:', error);
    }
  }

  onCancel() {
    this.router.navigate(['/animal', this.id()]);
  }
}
