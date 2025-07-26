import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonButton, IonCol, IonRow, IonGrid, IonInput } from '@ionic/angular/standalone';
//import { UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MainStoreService } from 'src/app/services/main-store.service';
import { firstValueFrom } from 'rxjs';
import { Login } from 'src/app/model/login';
import { Token } from 'src/app/model/token';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [FormsModule, IonRow, IonCol, IonButton, IonGrid, IonInput],
})
export class LoginPage {
  email = signal<string>('');
  password = signal<string>('');

  private http = inject(HttpClient);
  private router = inject(Router);
  private store = inject(MainStoreService);
  private api = environment.apiUrl;

  async onSubmit() {
    const login: Login = {
      email: this.email(),
      password: this.password(),
    };

    console.log('Login data:', login);

    try {
      const { token } = await firstValueFrom(
        this.http.post<Token>(this.api + 'auth/login', login)
      );
      this.store.setToken(token);

      /*
      const user = await firstValueFrom(
        this.http.get<User>(this.api + 'users/user_id/3600e259-0cc1-491d-9860-aa4cff12155c')
      );
      this.store.setUser(user);
      */
      this.router.navigate(['/animal/list']);
    } catch (err) {
      console.error('Error al iniciar sesión', err);
      // Aquí podrías mostrar un toast o alerta
    }
  }
}
