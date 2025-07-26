import { Component, inject, OnInit } from '@angular/core';
import {CreateLand, Land, UpdateLand} from "../../../../model/land";
import { LandsService } from 'src/app/services/lands.service';
import {ActivatedRoute, Router} from '@angular/router';
import {IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {LandFormComponent} from "../../components/land-form/land-form.component";

@Component({
  selector: 'app-land-edit',
  templateUrl: './land-edit.page.html',
  styleUrls: ['./edit.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    LandFormComponent
  ]
  standalone: true,
})
export class EditPage  implements OnInit {
  public land: Land | null = null;

  private landsService = inject(LandsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadLand(id);
  }

  private async loadLand(id: string) {
    this.land = await this.landsService.getLand(id);
  }

  async handleSave(payload: UpdateLand | CreateLand) {
    if (!this.land) return;
    await this.landsService.updateLand(this.land.id, payload as UpdateLand);
    this.router.navigate(['/predios/list']);
  }
}
