import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    IonModal,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar
  ]
})
export class DeleteUserModalComponent {

  userId = input<string>();
  deleted = output<void>();
  private modalController = inject(ModalController);

  confirm() {
    this.deleted.emit();
    this.modalController.dismiss({ confirm: true });
  }

  cancel() {
    this.modalController.dismiss({ confirm: false });
  }
}
