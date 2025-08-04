import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy, input, computed, resource } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonList, IonItem, IonLabel, IonSpinner, IonText
} from '@ionic/angular/standalone';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-change-tag-status',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonList, IonItem, IonLabel, IonSpinner, IonText
  ],
  templateUrl: './change-tag-status.component.html',
})
export class ChangeTagStatusComponent {
  /** ID del animal al que se gestionan las caravanas */
  readonly id = input<string>('');

  /** Asignaciones actuales del animal */
  readonly tags = input<{ tag_id: string; unassignment_date: string | null }[]>();

  private readonly tagService = inject(TagService);
  private readonly modalController = inject(ModalController);

  get animalId(): string {
    return typeof this.id === 'function' ? this.id() : this.id;
  }

  /** Recurso que carga todas las caravanas del sistema */
  readonly tagsResource = resource<
    { id: string; tag_number: string; status: string }[],
    undefined
  >({ loader: () => this.tagService.getAllTags() });

  /** Conjunto de IDs actualmente asignadas (sin fecha de desasignación) */
  readonly assignedTagIds = computed(() => new Set(
    (this.tags() ?? []).filter(t => !t.unassignment_date).map(t => t.tag_id)
  ));

  /** Lista de caravanas inactivas para asignar */
  readonly inactiveTags = computed(() =>
    (this.tagsResource.value() ?? []).filter(t => t.status === 'inactive')
  );

  /** Asigna una caravana al animal */
  async assignTag(tagId: string) {
    try {
        await this.tagService.assignTagToAnimal(tagId, this.id());
        this.modalController.dismiss({ refresh: true });
    } catch (e: any) {
        if (e?.error?.message) {
            alert(e.error.message); // O usa un toast/modal de Ionic
        } else {
            alert('Error inesperado al asignar caravana');
        }
    }
  }


  /** Desasigna una caravana del animal */
  async unassignTag(tagId: string) {
    await this.tagService.unassignTagFromAnimal(this.id(), tagId);
    this.modalController.dismiss({ refresh: true });
  }

  /** Cierra el modal sin cambios */
  close() {
    this.modalController.dismiss();
  }

  /** Recarga la página en caso de error */
  reload() {
    window.location.reload();
  }
}