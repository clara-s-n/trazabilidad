import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCol, IonGrid, IonInput, IonRow } from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [IonRow, IonCol, IonButton, IonInput, IonGrid, FormsModule]
})
export class LoginFormComponent  {

  public usuario = signal<string>("");
  public contrasena = signal<string>("");

  public httpCliente = inject(HttpClient);
  public apiUrl = environment.apiUrl;


  async onSubmit() {
    const respuesta = await this.doAuth(this.usuario(), this.contrasena());
    console.log({respuesta});
  }
  
  private doAuth (usuario: string, contrasena: string){
    const url = this.apiUrl + "auth/login";
    const data = {usuario, contrasena}
    return firstValueFrom(
      this.httpCliente.post<string>(url, data)
    )
  }
}

