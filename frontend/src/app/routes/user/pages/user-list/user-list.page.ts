import { Component, inject, resource } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonSpinner, IonText, IonButton, IonRow, IonIcon, IonCol
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline} from 'ionicons/icons';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./list.page.scss'],
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonSpinner, IonText, IonButton, IonRow, IonIcon, IonCol
  ],
  standalone: true,
})

export class UserListPage {
  constructor() {
    addIcons({
      eyeOutline
    });
  }


  private userService = inject(UserService);
  private router = inject(Router);

  usersResource = resource<User[], undefined>({
    loader: async () => await this.userService.getAllUsers()
  });

  goToUserProfile(user: User) {
    console.log(`${user.email}, ${user.id}, ${user.role_id}`);
    console.log(`Navigating to user profile with ID: ${user.id} `);
    this.router.navigate([`/user/profile/${user.id}`]);
  }

  reload() {
    window.location.reload()
  }

  goToUserEdit(user: User) {
    console.log(`Navigating to user edit with ID: ${user.id}`);
    this.router.navigate([`/user/edit/${user.id}`]);
  }
}
