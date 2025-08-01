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
  IonImg,
  IonContent,
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
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonGrid,
    IonIcon,
    IonRow,
    IonCol,
    IonInput,
    IonButton,
    FormsModule,
    IonSelect,
    IonSelectOption,
    JsonPipe,
    IonImg,
    IonContent,
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

  public src = signal<string | undefined>(`${environment.apiUrl}/photo/aaaa`);

  private url: string | undefined = '';
  async takePhoto() {
    const capturedPhoto: Photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    console.log({ capturedPhoto });
    this.foto.set(capturedPhoto);
    this.src.set(this.foto()?.webPath);
    this.url = this.foto()?.webPath;
  }

  async onSubmit() {
    if (!this.url) {
      return;
    }
    const response = await fetch(this.url);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append('file', blob, this.email + '.jpg');

    console.log(`form data:`, formData);

    this.userService.uploadPhoto(formData);

    /*  if (!(this.password === this.repeatPassword)) {
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
    }*/
  }
}
