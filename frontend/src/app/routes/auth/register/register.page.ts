import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import UserFormComponent from '../../../routes/user/components/user-form/user-form.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    UserFormComponent
  ],
})
export class RegisterPage {
  loading = signal(false);

 private userService = inject(UserService);
  private router = inject(Router);

  async onSubmit(data: { email: string; password: string; repeatPassword?: string; role_id: number }) {
    const user: any = {
      email: data.email,
      password: data.password,
      role_id: data.role_id
    };
    if (data.repeatPassword) {
      user.repeatPassword = data.repeatPassword;
    }
    try {
      const usuarioCreado = await this.userService.postUser(user);
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  }
  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
