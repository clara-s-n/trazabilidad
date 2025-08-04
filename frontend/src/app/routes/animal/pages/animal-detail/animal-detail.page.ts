import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { 
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonButton,
  //IonLabel,
  //IonList,
  IonCol,
  IonRow,
  IonSpinner,
  ModalController
} from '@ionic/angular/standalone';
import { AnimalService } from 'src/app/services/animal.service';
import { TagService } from 'src/app/services/tag.service';
import { ChangeTagStatusComponent } from '../../components/change-tag-status/change-tag-status.component';
import { TagHistoryComponent } from '../../components/tag-history/tag-history.component';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSpinner,
    IonItem,
    IonButton,
    RouterLink,
    IonCol,
    IonRow,
    DatePipe,
  ],
})
export class DetailPage implements OnInit {
  public animal_id = input.required<string>();
  private animalService = inject(AnimalService);
  private tagService = inject(TagService);
  private modalController = inject(ModalController);
  private route = inject(ActivatedRoute);

  animal = signal<any | null>(null);
  loading = signal(false);
  tags = signal<any[]>([]);

  async ngOnInit() {
    this.loading.set(true);
    const animalId = this.animal_id();
    console.log(animalId);
    if (animalId) {
      try {
        const animalData = await this.animalService.getAnimal(animalId);
        this.animal.set(animalData);

        // Cargar historial de tags
        this.tags.set(await this.tagService.getTagsByAnimal(animalId));
      } catch {
        this.animal.set(null);
      }
    }
    this.loading.set(false);
  }

  async openTagModal() {
    const modal = await this.modalController.create({
      component: ChangeTagStatusComponent, // crea este componente/modal
      componentProps: {
        animalId: this.animal()?.id,
        tags: this.tags(),
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.refresh) {
      this.tags.set(await this.tagService.getTagsByAnimal(this.animal()?.id));
    }
  }

  async openTagHistoryModal() {
    const modal = await this.modalController.create({
      component: TagHistoryComponent,
      componentProps: {
        tags: this.tags(),
        animal: this.animal()
      }
    });
    await modal.present();
  }
}
