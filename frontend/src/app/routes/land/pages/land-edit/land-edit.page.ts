import { Component, inject, signal } from '@angular/core';
import { CreateLand, Land, UpdateLand } from '../../../../model/land';
import { LandsService } from 'src/app/services/lands.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { LandFormComponent } from '../../components/land-form/land-form.component';

@Component({
  selector: 'app-land-edit',
  templateUrl: './land-edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    LandFormComponent,
  ],
})
export class EditPage {
  public land = signal<Land | null>(null);

  private landsService = inject(LandsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    const landId = this.route.snapshot.paramMap.get('id')!;
    this.loadLand(landId);
  }

  private async loadLand(id: string) {
    try {
      const landData = await this.landsService.getLand(id);
      this.land.set(landData);
    } catch (error) {
      console.error('Error loading land:', error);
      // Navigate back to list if land not found
      this.router.navigate(['/land/list']);
    }
  }

  async handleSave(payload: UpdateLand | CreateLand) {
    const currentLand = this.land();
    if (!currentLand) return;

    try {
      await this.landsService.updateLand(currentLand.id, payload as UpdateLand);
      this.router.navigate(['/land', currentLand.id]);
    } catch (error) {
      console.error('Error updating land:', error);
    }
  }
}
