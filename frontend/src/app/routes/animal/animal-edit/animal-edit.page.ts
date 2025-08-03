import { Component, HostListener, inject, input, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalFormComponent } from '../components/animal-form/animal-form.component';
import { IonSpinner, IonText } from '@ionic/angular/standalone';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: true,
  imports: [AnimalFormComponent, IonSpinner, IonText],
})
export class AnimalEditPage {
  private animalService = inject(AnimalService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public animal_id = input.required<string>();

  animal: any = null;
  loading = signal<boolean>(false);

  // Se llama cada vez que la vista va a entrar
  @HostListener('ionViewWillEnter')
  async ionViewWillEnter() {
    this.loading.set(true);
    const animalId = this.animal_id();
    console.log(animalId);
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
      await this.animalService.updateAnimal(this.animal.animal_id, data);
      this.router.navigate(['/animals', this.animal.animal_id]);
    } catch (error) {
      console.error('Error al actualizar el animal:', error);
    }
  }
  onCancel() {
    this.router.navigate(['/animals', this.animal?.animal_id ?? '']);
  }
}
