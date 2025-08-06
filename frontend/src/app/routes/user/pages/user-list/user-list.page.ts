import { CommonModule } from '@angular/common';
import { Component, inject, resource, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  eyeOutline,
  pencilOutline,
  homeOutline,
} from 'ionicons/icons';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { WebSocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonList,
    IonSpinner,
    IonText,
    IonRow,
    IonIcon,
    IonCol,
  ],
})
export class UserListPage implements OnInit, OnDestroy {
  constructor() {
    addIcons({
      eyeOutline,
      pencilOutline,
      addOutline,
      homeOutline,
    });
  }

  private userService = inject(UserService);
  private router = inject(Router);
  private title = inject(Title);
  private wsService = inject(WebSocketService);
  private unsubscribe: (() => void) | null = null;

  ngOnInit() {
    this.title.setTitle('Lista de Usuarios | Sistema de Trazabilidad');
    
    // Registrar handler para mensajes de users
    this.unsubscribe = this.wsService.onMessage('users', () => {
      console.log('Actualizando lista de usuarios por WebSocket');
      this.usersResource.reload();
    });
  }

  ngOnDestroy() {
    // Desregistrar el handler cuando se destruye el componente
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  usersResource = resource<User[], undefined>({
    loader: async () => await this.userService.getAllUsers(),
  });

  goToUserProfile(user: User) {
    console.log(`${user.email}, ${user.id}, ${user.role_id}`);
    console.log(`Navigating to user profile with ID: ${user.id} `);
    this.router.navigate([`/user/profile/${user.id}`]);
  }

  reload() {
    window.location.reload();
  }

  goToUserEdit(user: User) {
    console.log(`Navigating to user edit with ID: ${user.id}`);
    this.router.navigate([`/user/edit/${user.id}`]);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
