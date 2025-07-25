import { JsonPipe } from '@angular/common';
import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonInput, IonGrid, IonRow, IonCol, IonButton } from "@ionic/angular/standalone";
import { AnimalPost } from 'src/app/model/animalPost';
import { ReservadoDirective } from 'src/app/directives/reservado.directive';
import { ErrorMessagePipe } from 'src/app/pipes/error-message.pipe';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true,
  imports: [IonGrid,IonRow, IonCol, IonInput, IonButton, FormsModule, JsonPipe, ReservadoDirective, ErrorMessagePipe]
})
export class UserFormComponent {

  public animal = input<AnimalPost>({breed: '', birth_date: '', owner_id: '', land_id: '', status: ''});

  public breed = signal<string>(this.animal().breed);
  public birth_date = signal<string>(this.animal().birth_date);
  public dueno = signal<string>(this.animal().owner_id);
  public predio = signal<string>(this.animal().land_id);
  public _status = signal<string>(this.animal().status);

  public submtitted = output<AnimalPost>()
  
  async onSubmit(){
    const datos:AnimalPost = {
      breed: this.breed(),
      birth_date: this.birth_date(),
      owner_id: this.dueno(),
      land_id: this.predio(),
      status: this._status(),
    }
    this.submtitted.emit(datos);
  }

}
