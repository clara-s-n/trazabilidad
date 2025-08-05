// user-edit.ts

import { Component, ChangeDetectionStrategy, inject, signal, resource, computed, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User, UserPost } from 'src/app/model/user';
import UserFormComponent from '../../components/user-form/user-form.component';
import { IonSpinner, IonText } from '@ionic/angular/standalone';

/**
 * Página para editar un usuario existente.
 * Carga los datos usando `resource` al entrar y rellena el formulario automáticamente.
 */
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.page.html',
  styleUrls: ['./user-edit.page.scss'],
  imports: [UserFormComponent, IonSpinner, IonText],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'user-edit-page' }
})

export class UserEditPage {
  private userService = inject(UserService);
  private router = inject(Router);

  public id = input.required<string>();

  userResource = resource<UserPost,undefined>({loader: async () => {
    const id = this.id();
    if (!id) throw new Error('ID aún no disponible');
    return await this.userService.getUserById(id)
  }});

  async onSubmit(data: { email: string; role_id: number }) {
    try {
      await this.userService.updateUser(this.id(), data);
      this.router.navigate(['/user/profile', this.id()]);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
    }
  }

  onCancel() {
    this.router.navigate(['/users', this.id()]);
  }
}
