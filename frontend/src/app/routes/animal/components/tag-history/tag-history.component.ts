import { Component, ChangeDetectionStrategy, inject, input, resource, computed } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonList, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { CompleteAnimal } from 'src/app/model/animal';
import { TagHistoryRecord } from 'src/app/model/tag';
import { TagService } from 'src/app/services/tag.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tag-history',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonList, IonItem, IonLabel,
    DatePipe
  ],
  templateUrl: './tag-history.component.html',
})
export class TagHistoryComponent {
  private readonly tagService = inject(TagService);
  private readonly modalCtrl = inject(ModalController);

  /** Datos del animal para consulta */
  readonly animal = input.required<CompleteAnimal>();

 get animalValue(): CompleteAnimal {
    return typeof this.animal === 'function' ? this.animal() : this.animal;
  }

  get animalId(): string {
    return this.animalValue?.id;
  }

  /** Recurso que carga el historial de caravanas */
  readonly tagsResource = resource<TagHistoryRecord[], undefined>({
    loader: () => this.tagService.getTagsByAnimal(this.animalId)
  });

  /** Array puro para iterar en la plantilla */
  readonly historyRecords = computed(() => this.tagsResource.value());

  /** Cierra el modal de historial */
  close() {
    this.modalCtrl.dismiss();
  }

  /** Abre el modal para mostrar el historial de caravanas */
  openTagHistory() {
    this.modalCtrl.create({
      component: TagHistoryComponent,
      componentProps: { animal: this.animal }
    }).then(modal => modal.present());
  }
}