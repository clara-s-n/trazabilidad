import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy, input, computed, resource } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonList, IonItem, IonLabel, IonSpinner, IonText,
  ModalController
} from '@ionic/angular/standalone';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-change-tag-status',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
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
  isChange = input<boolean>(false);
  /** Caravana asignada */
  readonly oldTagId = input<string>('');

  /** Asignaciones actuales del animal */
  readonly tags = input<{ tag_id: string; unassignment_date: string | null }[]>();

  private readonly tagService = inject(TagService);
  private readonly modalController = inject(ModalController);

  get animalId(): string {
    return typeof this.id === 'function' ? this.id() : this.id;
  }

  get change(): boolean {
    return typeof this.isChange === 'function' ? this.isChange() : this.isChange;
  }

  get currentTagId(): string {
    return typeof this.oldTagId === 'function' ? this.oldTagId() : this.oldTagId;
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
        console.log('Asignando tag', tagId, 'al animal', this.animalId);
        const result = await this.tagService.assignTagToAnimal(tagId, this.animalId);
        console.log('Result of assignTag:', result);
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

  async changeAnimalTag(newTagId: string) {
    console.log('Cambiando tag', this.animalId, this.currentTagId, newTagId)
    try {
      if (!this.currentTagId) {
        console.error('No hay tag actual para cambiar');
        alert('Error: No hay una caravana actual para cambiar');
        return;
      }
      await this.tagService.changeAnimalTag(this.animalId, this.currentTagId, newTagId);
      alert('Tag cambiada correctamente');
      this.modalController.dismiss({ refresh: true });
    } catch (e: any) {
      console.error('Error al cambiar tag:', e);
      alert(e?.error?.message || 'Error al cambiar la tag');
    }
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