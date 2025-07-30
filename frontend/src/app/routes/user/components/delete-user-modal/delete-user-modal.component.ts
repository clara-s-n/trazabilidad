import {Component, inject, Input} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import {Land} from "../../../../model/land";

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar
  ]
})
export class DeleteUserModalComponent{

  @Input() land!: Land;
  private modalController = inject(ModalController);

  confirm() {
    this.modalController.dismiss({ confirm: true });
  }

  cancel() {
    this.modalController.dismiss({ confirm: false });
  }
}
