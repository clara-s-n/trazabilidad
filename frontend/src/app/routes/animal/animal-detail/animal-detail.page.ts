import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonButton,
} from '@ionic/angular/standalone';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonButton,
    RouterLink,
  ],
})
export class DetailPage implements OnInit {
  private animalService = inject(AnimalService);
  private route = inject(ActivatedRoute);

  animal = signal<any | null>(null);
  loading = signal(false);
  async ngOnInit() {
    this.loading.set(true);
    const animalId = this.route.snapshot.paramMap.get('id');
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
}
