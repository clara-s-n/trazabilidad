import {Component, inject, OnInit, signal} from '@angular/core';
import {
  IonBackButton, IonButton,
  IonButtons,
  IonCard, IonCardContent, IonCardHeader, IonCardTitle,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar, ModalController
} from "@ionic/angular/standalone";
import {Land} from "../../../../model/land";
import {ActivatedRoute, Router} from "@angular/router";
import {LandsService} from "../../../../services/lands.service";
import {DeleteLandModalComponent} from "../../components/delete-land-modal/delete-land-modal.component";

@Component({
  selector: 'app-land-detail',
  templateUrl: './land-detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
  ]
})
export class DetailPage  implements OnInit {

  public land = signal<Land | null>(null);
  private landsService = inject(LandsService);
  private route = inject(ActivatedRoute);
  private modalController = inject(ModalController);
  private router = inject(Router);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadLand(id);
  }

  private async loadLand(id: string) {
    this.land.set(await this.landsService.getLand(id));
  }

  goBack() {
    this.router.navigate(['/land/list']);
  }

  goEdit() {
    const id = this.land()?.id;
    if (id) this.router.navigate(['/land/edit', id]);
  }

  async confirmDelete() {
    const current = this.land();
    if (!current) return;
    const modal = await this.modalController.create({
      component: DeleteLandModalComponent,
      componentProps: { land: current }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.confirm) {
      await this.landsService.deleteLand({ land_id: current.id });
      this.router.navigate(['/land/list']);
    }
  }
}
