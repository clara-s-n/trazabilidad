import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCol, IonGrid, IonInput, IonRow } from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { Login } from 'src/app/model/login';
import { Token } from 'src/app/model/token';
import { User } from 'src/app/model/user';
import { MainStoreService } from 'src/app/services/main-store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [IonRow, IonCol, IonButton, IonInput, IonGrid, FormsModule]
})
export class LoginFormComponent  {

  public submtitted = output<Login>()
  
  public email = signal<string>("");
  public password = signal<string>("");

  async onSubmit(){
    const datos:Login = {
      email: this.email(),
      password : this.password(),
    }
    this.submtitted.emit(datos);
  }
}
