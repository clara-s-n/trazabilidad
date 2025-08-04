import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonItem,
  IonButton, IonCol, IonRow, IonSpinner, ModalController
} from '@ionic/angular/standalone';
import { AnimalService } from 'src/app/services/animal.service';
import { TagService } from 'src/app/services/tag.service';
import { ChangeTagStatusComponent } from '../../components/change-tag-status/change-tag-status.component';
import { TagHistoryComponent } from '../../components/tag-history/tag-history.component';
import { Animal, CompleteAnimal } from 'src/app/model/animal';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    CommonModule, DatePipe,
    IonHeader, IonToolbar, IonTitle, IonContent, IonItem,
    IonButton, IonCol, IonRow, IonSpinner
  ],
})
export class DetailPage implements OnInit {
  public animal_id = input.required<string>();
  public router = inject(Router)

  private readonly animalService = inject(AnimalService);
  private readonly tagService = inject(TagService);
  private readonly modalController = inject(ModalController);

  animal: CompleteAnimal | null = null;
  loading = false;

  async ngOnInit() {
    this.loading = true;
    const id = this.animal_id();
    if (id) {
      try {
        this.animal = await this.animalService.getCompleteAnimal(id);
      } catch {
        this.animal = null;
      }
    }
    this.loading = false;
  }

  async openTagModal() {
    if (!this.animal) return;
    const modal = await this.modalController.create({
      component: ChangeTagStatusComponent,
      componentProps: {
        id: this.animal.animal_id,
        tags: []
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.refresh) {
      // Actualizar datos si es necesario
    }
  }

  async openTagHistoryModal() {
    if (!this.animal) return;
    const modal = await this.modalController.create({
      component: TagHistoryComponent,
      componentProps: { animal: this.animal }
    });
    await modal.present();
  }

}