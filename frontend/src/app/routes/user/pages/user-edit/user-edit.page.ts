import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
  standalone: true,
})
export class UserEditPage {

  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  user: any = null;
  loading = false;

  async ngOnInit() {
    this.loading = true;
    const userId = this.route.snapshot.paramMap.get('userId');
    if (userId) {
      try {
        this.user = await this.userService.getUserById(userId);
      } catch (e) {
        this.user = null;
      }
    }
    this.loading = false;
  }

  async onSubmit(data: { email: string; password: string; repeatPassword?: string; role_id: number }) {
    try {
      await this.userService.updateUser(this.user.user_id, data);
      this.router.navigate(['/users', this.user.user_id]);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  }
  onCancel() {
    this.router.navigate(['/users', this.user?.user_id ?? '']);
  }
}