import { Component, inject } from '@angular/core';

import { resource } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/model/tag';
import { IonButton, IonContent, IonGrid, IonItem, IonLabel, IonList, IonSelect, IonSelectOption, IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  templateUrl: './tag-list.page.html',
  imports: [IonContent, IonGrid, IonSelect, IonSelectOption, IonItem, IonLabel, IonList],
})
export class TagListPage {
  private tagService = inject(TagService);

  // 1) Usamos resource para cargar todas las tags
  tagsResource = resource<Tag[], undefined>({
    loader: () => this.tagService.getAllTags()
  });

  /**
   * Se dispara cuando el usuario cambia el estado en el ion-select.
   * @param tag  La tag que se está editando
   * @param newStatus  El nuevo estado seleccionado
   */
  onStatusChange(tag: Tag, newStatus: string) {
    this.tagService.updateTagStatus(tag.id, newStatus)
      .then(() => {

        console.log(`Estado de tag ${tag.id} actualizado a ${newStatus}`);
        // recarga la lista tras guardar
        this.tagsResource.reload();
      })
      .catch(err => {
        console.error('Error actualizando estado de tag:', err);
        this.tagsResource.reload(); // recarga para evitar inconsistencias
      });
  }

  /**
   * Método para asignar una tag a un animal.
   * @param tagId - ID de la tag
   * @param animalId - ID del animal
   */
  assignTagToAnimal(tagId: string, animalId: string) {
    this.tagService.assignTagToAnimal(tagId, animalId)
      .then(() => {
        // recarga la lista tras asignar
        this.tagsResource.reload();
      })
      .catch(err => {
        console.error('Error asignando tag al animal:', err);
      });
  }
}
