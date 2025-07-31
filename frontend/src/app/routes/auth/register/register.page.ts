import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from '@ionic/angular/standalone';
import { UserPost } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { cameraOutline } from 'ionicons/icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonButton,
    FormsModule,
    IonSelect,
    IonSelectOption,
    JsonPipe,
  ],
})
export class RegisterPage {
  private userService = inject(UserService);
  private router = inject(Router);

  constructor() {
    addIcons({ cameraOutline });
  }

  // Modelo del formulario
  public email: string = '';
  public password: string = '';
  public repeatPassword: string = '';
  public role_id: number = 0;

  public foto = signal<Photo | undefined>(undefined);

  async takePhoto() {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    console.log({ capturedPhoto });
    this.foto.set(capturedPhoto);
  }

  async onSubmit() {
    if (!(this.password === this.repeatPassword)) {
      console.error('Las contraseñas no coinciden');
      this.router.navigate(['/auth/register/']);
    }

    const user: UserPost = {
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword,
      role_id: this.role_id,
    };

    try {
      const usuarioCreado = await this.userService.postUser(user);
      console.log({ usuarioCreado });
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  }
}
