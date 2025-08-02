import { Component, inject, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
  ],
})
export class EditPage implements OnInit {
  constructor() {}

  public animal: Animal | null = null;

  private animalService = inject(AnimalService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadAnimals(id);
  }

  private async loadAnimals(id: string) {
    this.animal = await this.animalService.getAnimal(id);
  }

  async handleSave(payload: UpdateAnimal | AnimalPost) {
    if (!this.animal) return;
    await this.animalService.updateAnimal(
      this.animal.id,
      payload as UpdateAnimal
    );
    this.router.navigate(['/animal/list']);
  }
}
