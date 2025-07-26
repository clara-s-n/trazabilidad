import {Component, inject, OnInit, signal} from '@angular/core';
import {Land} from "../../../../model/land";
import {LandsService} from "../../../../services/lands.service";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader, IonItem, IonLabel, IonList,
  IonTitle,
  IonToolbar,
  ModalController
} from "@ionic/angular/standalone";
import {DeleteLandModalComponent} from "../../components/delete-land-modal/delete-land-modal.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-land-list',
  templateUrl: './land-list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    RouterLink
  ]
})
export class ListPage  implements OnInit {

  public lands = signal<Land[]>([]);

  private landService: LandsService = inject(LandsService);
  private modalController: ModalController = inject(ModalController)

  constructor(
  ) {}

  ngOnInit() {
    this.loadLands();
  }

  async loadLands() {
    const data = await this.landService.getAllLands();
    this.lands.set(data);
  }

  async confirmDelete(land: Land) {
    const modal = await this.modalController.create({
      component: DeleteLandModalComponent,
      componentProps: { land }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.confirm) {
      await this.deleteLand(land.id);
    }
  }

  async deleteLand(id: string) {
    await this.landService.deleteLand({ land_id: id });
    this.loadLands();
  }
}
