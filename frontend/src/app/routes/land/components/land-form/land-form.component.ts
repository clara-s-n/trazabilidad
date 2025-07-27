import {Component, input, output, signal} from '@angular/core';
import {CreateLand, Land, UpdateLand} from "../../../../model/land";
import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonRow,
} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-land-form',
  templateUrl: './land-form.component.html',
  styleUrls: ['./land-form.component.scss'],
  imports: [
    IonInput,
    IonGrid,
    FormsModule,
    IonRow,
    IonCol,
    IonButton
  ]
})
export class LandFormComponent{
  // Recibe un predio para edición; null para creación
  public land = input<Land | null>(null);

  // Señales para cada campo
  public name = signal<string>(this.land()?.name ?? '');
  public latitude = signal<number | null>(this.land()?.latitude ?? null);
  public longitude = signal<number | null>(this.land()?.longitude ?? null);

  // Emite al hacer submit el payload de creación o actualización
  public submitted = output<CreateLand | UpdateLand>();

  async onSubmit() {
    const payload = {
      name: this.name(),
      latitude: this.latitude()!,
      longitude: this.longitude()!
    } as CreateLand & UpdateLand;
    this.submitted.emit(payload);
  }
}
