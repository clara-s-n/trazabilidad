import { Component, OnInit, ChangeDetectionStrategy, inject, signal, input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';
import { DatePipe } from '@angular/common';
import { TagHistoryRecord } from 'src/app/model/tag';

/**
 * Componente para mostrar el historial de asignaciones y desasignaciones
 * de caravanas (tags) de un animal.
 */
@Component({
  selector: 'app-tag-history',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel
  ],
  templateUrl: './tag-history.component.html',
})
export class TagHistoryComponent implements OnInit {
  /** Lista de registros de historial (assignment/unassignment) */
  readonly tags = input<TagHistoryRecord[]>([]);

  /** Datos del animal (por si se requieren más detalles) */
  readonly animal = input<{ id: string; name?: string }>();

  /** Señal que almacena el historial a mostrar */
  readonly historyRecords = signal<TagHistoryRecord[]>([]);

  private readonly modalCtrl = inject(ModalController);
  public readonly datePipe = inject(DatePipe);

  constructor() {}

  /** Inicializa la señal con los tags recibidos por input */
  ngOnInit(): void {
    this.historyRecords.set(this.tags());
  }

  /** Cierra el modal */
  close(): void {
    this.modalCtrl.dismiss();
  }
}
