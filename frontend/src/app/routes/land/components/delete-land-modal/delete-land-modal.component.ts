import {Component, inject, Input, OnInit} from '@angular/core';
import {Land} from "../../../../model/land";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-delete-land-modal',
  templateUrl: './delete-land-modal.component.html',
  styleUrls: ['./delete-land-modal.component.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent
  ]
})
export class DeleteLandModalComponent {

  @Input() land!: Land;
  private modalController = inject(ModalController);

  confirm() {
    this.modalController.dismiss({ confirm: true });
  }

  cancel() {
    this.modalController.dismiss({ confirm: false });
  }
}
