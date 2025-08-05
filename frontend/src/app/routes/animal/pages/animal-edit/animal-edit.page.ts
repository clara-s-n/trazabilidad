// animal-edit.ts

import { Component, ChangeDetectionStrategy, computed, inject, input, resource } from '@angular/core';
import { Router } from '@angular/router';
import { AnimalFormComponent } from '../../components/animal-form/animal-form.component';
import { IonSpinner, IonText } from '@ionic/angular/standalone';
import { AnimalService } from 'src/app/services/animal.service';
import { Animal } from 'src/app/model/animal';

/**
 * Página de edición de animal.
 * Carga los datos automáticamente con resource() usando el ID de la ruta.
 */
@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AnimalFormComponent, IonSpinner, IonText],
  host: { class: 'animal-edit-page' }
})
export class AnimalEditPage {
  private animalService = inject(AnimalService);
  private router = inject(Router);

  /** ID inyectado por el sistema de rutas con @route */
  readonly animal_id = input.required<string>();

  /** Recurso que obtiene el animal en base al ID */
  readonly animalResource = resource<Animal, undefined>({
    loader: () => {
    const id = this.animal_id();
    if (!id) throw new Error('ID no disponible aún');
    return this.animalService.getAnimal(id);
    }});

  /** Señal reactiva del animal */
  readonly animal = computed(() => this.animalResource.value() ?? undefined);

  async onSubmit(data: {
    breed?: string;
    birth_date?: string;
    owner_id?: string;
    land_id?: string;
    status?: string;
  }) {
    try {
      await this.animalService.updateAnimal(this.animal_id(), data);
      this.router.navigate(['/animal', this.animal_id()]);
    } catch (error) {
      console.error('Error al actualizar el animal:', error);
    }
  }

  onCancel() {
    this.router.navigate(['/animal', this.animal_id()]);
  }
}
