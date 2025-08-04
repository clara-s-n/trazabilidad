import { Component, ChangeDetectionStrategy, inject, input, resource, computed } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonList, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { CompleteAnimal } from 'src/app/model/animal';
import { TagHistoryRecord } from 'src/app/model/tag';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tag-history',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonList, IonItem, IonLabel
  ],
  templateUrl: './tag-history.component.html',
})
export class TagHistoryComponent {
  private readonly tagService = inject(TagService);
  private readonly modalCtrl = inject(ModalController);

  /** Datos del animal para consulta */
  readonly animal = input.required<CompleteAnimal>();

  /** Recurso que carga el historial de caravanas */
  readonly tagsResource = resource<TagHistoryRecord[], undefined>({
    loader: () => this.tagService.getTagsByAnimal(this.animal().animal_id)
  });

  /** Array puro para iterar en la plantilla */
  readonly historyRecords = computed(() => this.tagsResource.value());

  /** Cierra el modal de historial */
  close() {
    this.modalCtrl.dismiss();
  }
}