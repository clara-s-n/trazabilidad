import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
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
    IonContent,
    IonTitle,
    IonBackButton,
    IonButtons,
    IonToolbar,
    IonHeader,
  ],
  templateUrl: './land-create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class LandCreatePage implements OnInit {
  private landsService = inject(LandsService);
  private router = inject(Router);
  private title = inject(Title);

  ngOnInit() {
    this.title.setTitle('Crear Predio | Sistema de Trazabilidad');
  }

  /** Acepta payload de creación o edición, pero crea sólo CreateLandParams */
  async handleSave(payload: CreateLand | (UpdateLand & { file?: File })) {
    try {
      // Extract file from payload if present
      const file = (payload as any).file;
      delete (payload as any).file;

      // Para creación, payload incluirá todos los campos obligatorios
      const newLand = await this.landsService.createLand(payload as CreateLand);

      // If we have a file, upload it after land creation
      if (file) {
        try {
          const imageUploadResult = await this.landsService.uploadLandImage(
            newLand.id,
            file
          );
          console.log('Image uploaded successfully:', imageUploadResult);
        } catch (imageError) {
          console.error('Error uploading image:', imageError);
          // Land was still created, continue to list page
        }
      }

      this.router.navigate(['/land/list']);
    } catch (error) {
      console.error('Error creating land:', error);
    }
  }
}
