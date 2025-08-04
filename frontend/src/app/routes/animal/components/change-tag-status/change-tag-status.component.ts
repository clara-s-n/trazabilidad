import { Component, OnInit, ChangeDetectionStrategy, inject, computed, signal, OutputEmitterRef, input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { 
  IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
  IonContent, IonList, IonItem, IonLabel 
} from '@ionic/angular/standalone';
import { TagService } from 'src/app/services/tag.service';

/**
 * Componente para asignar o desasignar tags a un animal.
 */
@Component({
  selector: 'app-change-tag-status',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,  // Solo dispara CD cuando cambian inputs o eventos 
  imports: [
    IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonContent, IonList, IonItem, IonLabel
  ],
  templateUrl: './change-tag-status.component.html',
})
export class ChangeTagStatusComponent implements OnInit {
  /** ID del animal al que asignar/desasignar tags. */
  readonly id = input.required<string>();

  /** Lista de asignaciones actuales (con posibles fechas de desasignación). */
  readonly tags = input<{ tag_id: string; unassignment_date: string |null }[]>();

  /** Todas las tags disponibles. */
  readonly allTags = signal<{ id: string; tag_number: string; status: string }[]>([]);

  /**
   * Conjunto de IDs de tags actualmente asignadas (sin fecha de desasignación).
   */
  readonly assignedTagIds = computed(() => 
    new Set((this.tags() ?? []).filter(t => !t.unassignment_date).map(t => t.tag_id))
  );  

  private readonly tagService = inject(TagService);
  private readonly modalController = inject(ModalController);

  constructor() {}

  /** Carga todas las tags disponibles al iniciar el componente. */
  async ngOnInit(): Promise<void> {
    this.allTags.set(await this.tagService.getAllTags());
  }

  /**
   * Asigna la tag indicada al animal.
   * @param tagId ID de la tag a asignar
   */
  async assignTag(tagId: string): Promise<void> {
    await this.tagService.assignTagToAnimal(tagId, this.id());
    this.modalController.dismiss({ refresh: true });
  }

  /**
   * Desasigna la tag indicada del animal.
   * @param tagId ID de la tag a desasignar
   */
  async unassignTag(tagId: string): Promise<void> {
    await this.tagService.unassignTagFromAnimal(this.id(), tagId);
    this.modalController.dismiss({ refresh: true });
  }

  /** Cierra el modal sin cambios. */
  close(): void {
    this.modalController.dismiss();
  }
}
