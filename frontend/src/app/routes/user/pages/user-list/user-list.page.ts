import { Component, inject, OnInit, resource } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
})
export class UserListPage {
  private userService = inject(UserService);
  private router = inject(Router);

  // Utiliza resource para la carga reactiva
  usersResource = resource<User[], undefined>({
    loader: async () => await this.userService.getAllUsers()
  });

  goToUserProfile(userId: string) {
    this.router.navigate(['/users/profile', userId]);
  }
}