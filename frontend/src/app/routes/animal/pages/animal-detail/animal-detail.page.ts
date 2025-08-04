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
import { Tag } from 'src/app/model/tag';

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
  public currentTag : Tag | null = null;

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
        // Obtener la caravana actual
        const currentTagResponse = await this.animalService.getCurrentTag(id);
        if (currentTagResponse && currentTagResponse.tag) {
          this.currentTag = currentTagResponse.tag; // Objeto completo
          this.animal.currentTag = currentTagResponse.tag; // <-- Guarda el objeto completo
        } else {
          this.currentTag = null;
          this.animal.currentTag = null;
        }
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
        id: this.animal.id,
        tags: this.animal.currentTag ?? [], // <-- PASA LAS ASIGNACIONES ACTUALES
        isChange: !!this.currentTag,   // true si hay tag actual, false si no
        oldTagId: this.currentTag ? this.currentTag.id : '', // <-- PASA LA TAG ACTUAL
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.refresh) {
      // Actualizar datos si es necesario
      await this.ngOnInit();
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