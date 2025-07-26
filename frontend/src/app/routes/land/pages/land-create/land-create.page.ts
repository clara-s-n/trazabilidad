import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-land-create',
  templateUrl: './land-create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: true,
  imports: [
    LandFormComponent,
    //IonContent,
    IonTitle,
    IonBackButton,
    IonButtons,
    IonToolbar,
    IonHeader
  ],
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss']
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
