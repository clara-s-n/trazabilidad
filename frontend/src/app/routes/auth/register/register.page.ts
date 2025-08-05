import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCol,
  IonRow,
  IonGrid,
  IonInput,
  IonItem,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
    IonInput,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
  ],
})
export class RegisterPage {
  email = signal<string>('');
  password = signal<string>('');
  confirmPassword = signal<string>('');
  loading = signal<boolean>(false);
  error = signal<string>('');

  private router = inject(Router);
  private authService = inject(AuthService);

  async onSubmit() {
    if (!this.email() || !this.password() || !this.confirmPassword()) {
      this.error.set('Todos los campos son requeridos');
      return;
    }

    if (this.password() !== this.confirmPassword()) {
      this.error.set('Las contraseñas no coinciden');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    try {
      await this.authService.register(this.email(), this.password());

      // Redirect to login after successful registration
      this.router.navigate(['/auth/login']);
    } catch (error) {
      console.error('Register failed:', error);
      this.error.set(
        'Error al registrar usuario. Por favor, inténtalo de nuevo.'
      );
    } finally {
      this.loading.set(false);
    }
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
