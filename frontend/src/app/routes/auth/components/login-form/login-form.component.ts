import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCol, IonGrid, IonInput, IonRow } from '@ionic/angular/standalone';
import { Login } from 'src/app/model/login';

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
