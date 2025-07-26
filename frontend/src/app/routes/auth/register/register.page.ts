import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { UserPost } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonButton,
    FormsModule,
    IonSelect,
    IonSelectOption,
    JsonPipe
  ],
})
export class RegisterPage {
  private userService = inject(UserService);
  private router = inject(Router);

  // Modelo del formulario
  public email: string = '';
  public password: string = '';
  public repeatPassword: string = '';
  public role_id: number = 0;


  async onSubmit() {

    if (!(this.password === this.repeatPassword)) {
      console.error('Las contraseñas no coinciden')
      this.router.navigate(['/auth/register/']);
    }

    const user: UserPost = {
      email: this.email,
      password: this.password,
      repeatPassword : this.repeatPassword,
      role_id: this.role_id
    };

    try {
      const usuarioCreado = await this.userService.postUser(user);
      console.log({ usuarioCreado });
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  }
}
