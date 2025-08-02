import { Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Animal } from 'src/app/model/animal';
import { AnimalPost, UpdateAnimal } from 'src/app/model/animalPost';
import { AnimalService } from 'src/app/services/animal.service';
import { AnimalFormComponent } from '../components/animal-form/animal-form.component';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: true,
  imports: [
    AnimalFormComponent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
  ],
})
export class EditPage {
  private animalService = inject(AnimalService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  animal = signal<any | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  // Refresca cada vez que entras a la vista
  @HostListener('ionViewWillEnter')
  async ionViewWillEnter() {
    this.loading.set(true);
    this.error.set(null);
    const animalId = this.route.snapshot.paramMap.get('animal_id');
    if (animalId) {
      try {
        const animal = await this.animalService.getAnimal(animalId);
        this.animal.set(animal);
      } catch (e: any) {
        this.animal.set(null);
        this.error.set('No se encontró el animal');
      }
    }
    this.loading.set(false);
  }

  async onSubmit(data: Partial<{ breed: string; birth_date: string; owner_id: string; land_id: string; status: string }>) {
    const animalId = this.route.snapshot.paramMap.get('animal_id');
    if (!animalId) return;
    this.loading.set(true);
    try {
      await this.animalService.updateAnimal(animalId, data);
      this.router.navigate(['/animales', animalId]);
    } catch (e: any) {
      this.error.set('No se pudo guardar el animal');
    }
    this.loading.set(false);
  }

  onCancel() {
    const animalId = this.route.snapshot.paramMap.get('animal_id');
    this.router.navigate(['/animales', animalId]);
  }
}