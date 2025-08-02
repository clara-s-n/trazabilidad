import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import UserForm from '../../user/components/user-form/user-form.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [UserForm],
})
export class RegisterPage {
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
  onCancel() {
    this.router.navigate(['/auth/login']);
  }
}
