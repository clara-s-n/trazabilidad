import { Component, inject, OnInit } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { UpperCasePipe } from '@angular/common';
import { IonContent, IonRow } from '@ionic/angular/standalone';
import { User } from 'src/app/model/user';
import { Token } from '@angular/compiler';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MainStoreService } from 'src/app/services/main-store.service';
import { firstValueFrom } from 'rxjs';
import { Login } from 'src/app/model/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports : [LoginFormComponent, UpperCasePipe, IonContent]
})
export class LoginPage  {

  public httpCliente = inject(HttpClient);
  public apiUrl = environment.apiUrl;
  private mainStore = inject(MainStoreService);

  async doAuth(data: Login) {
    const url = this.apiUrl + "auth/login";
    const objToken = await firstValueFrom(
    this.httpCliente.post<Token>(url, data));
    const url2 = this.apiUrl + "users/user_id/3600e259-0cc1-491d-9860-aa4cff12155c"
    const usuario = await firstValueFrom(this.httpCliente.get<User>(url2, {headers: {
      "Authorization" :"Bearer " + objToken
    }}));
    console.log({usuario});
    this.mainStore.usuario.set(usuario);
  }
}
