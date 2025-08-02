import {Component, HostListener, inject, OnInit, signal} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import UserFormComponent from "../../components/user-form/user-form.component";
import {IonSpinner, IonText} from "@ionic/angular/standalone";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
  standalone: true,
  imports: [
    UserFormComponent,
    IonSpinner,
    IonText
  ]
})
export class UserEditPage {

  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  user: any = null;
  loading = signal<boolean>(false);

  // Se llama cada vez que la vista va a entrar
  @HostListener('ionViewWillEnter')
  async ionViewWillEnter() {
    this.loading.set(true);
    const userId = this.route.snapshot.paramMap.get('userId');
    console.log(userId)
    if (userId) {
      try {
        const userData = await this.userService.getUserById(userId);
        this.user.set(userData);
      } catch {
        this.user.set(null);
      }
    }
    this.loading.set(false);
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
