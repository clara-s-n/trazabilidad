import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LandsService } from '../../../../services/lands.service';
import { CreateLand, UpdateLand } from '../../../../model/land';
import { LandFormComponent } from '../../components/land-form/land-form.component';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-land-create',
  standalone: true,
  imports: [
    LandFormComponent,
    //IonContent,
    IonTitle,
    IonBackButton,
    IonButtons,
    IonToolbar,
    IonHeader,
  ],
  templateUrl: './land-create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class LandCreatePage {
  private landsService = inject(LandsService);
  private router = inject(Router);

  /** Acepta payload de creación o edición, pero crea sólo CreateLandParams */
  async handleSave(payload: CreateLand | UpdateLand) {
    // Para creación, payload incluirá todos los campos obligatorios
    await this.landsService.createLand(payload as CreateLand);
    this.router.navigate(['/land/list']);
  }
}
