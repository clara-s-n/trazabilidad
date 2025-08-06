import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonCol,
  IonRow,
  IonGrid,
  IonInput,
  IonItem,
  IonIcon,
  IonLabel,
  IonSpinner,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { addIcons } from 'ionicons';
import {
  shieldCheckmark,
  alertCircle,
  mailOutline,
  lockClosedOutline,
  logInOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    //IonRow,
    //IonCol,
    IonButton,
    //IonGrid,
    IonInput,
    IonItem,
    IonIcon,
    IonLabel,
    IonSpinner,
  ],
})
export class LoginPage {
  email = signal<string>('');
  password = signal<string>('');
  loading = signal<boolean>(false);
  error = signal<string>('');

  private router = inject(Router);
  private authService = inject(AuthService);

  constructor() {
    // Add the icons we need
    addIcons({
      shieldCheckmark,
      alertCircle,
      mailOutline,
      lockClosedOutline,
      logInOutline,
    });
  }

  async onSubmit() {
    if (!this.email() || !this.password()) {
      this.error.set('Por favor, ingresa email y contraseña');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    try {
      const success = await this.authService.login(
        this.email(),
        this.password()
      );

      if (success) {
        // Redirect to dashboard after successful login
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.error('Login failed:', error);
      this.error.set('Credenciales inválidas. Por favor, inténtalo de nuevo.');
    } finally {
      this.loading.set(false);
    }
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
