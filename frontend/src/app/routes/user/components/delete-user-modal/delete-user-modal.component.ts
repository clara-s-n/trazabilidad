import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    //IonModal,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar
  ]
})
export class DeleteUserModalComponent {
  private userService = inject(UserService);
  userId = input<string>('');
  deleted = output<void>();
  private modalController = inject(ModalController);

  // String del userId para mostrar en la plantilla
  get userIdStr(): string {
    return typeof this.userId === 'function' ? this.userId() : this.userId;
  }

  async confirmDelete() {
    await this.userService.deleteUser(this.userIdStr);
    this.deleted.emit();
    this.modalController.dismiss({ confirm: true });
  }

  cancel() {
    this.modalController.dismiss({ confirm: false });
  }
}
