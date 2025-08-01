import { Component, inject, resource } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonList,
  IonItem, IonSpinner, IonText, IonButton, IonRow, IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./list.page.scss'],
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonSpinner, IonText, IonButton, IonRow, IonIcon
  ],
  standalone: true,
})
export class UserListPage {
  private userService = inject(UserService);
  private router = inject(Router);

  usersResource = resource<User[], undefined>({
    loader: async () => await this.userService.getAllUsers()
  });

  goToUserProfile(userId: string) {
    this.router.navigate(['/user/profile', userId]);
  }

  reload() {
    window.location.reload()
  }
}
