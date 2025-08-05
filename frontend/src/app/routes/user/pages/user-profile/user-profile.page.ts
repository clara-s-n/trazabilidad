import { Component, inject, OnInit, signal } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonItem, IonButton} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonButton, RouterLink],
  standalone: true
})
export class UserProfilePage implements OnInit {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);

  role: string =''

  user = signal<any | null>(null);
  loading = signal(false);

  async ngOnInit() {
    this.loading.set(true);
    const userId = this.route.snapshot.paramMap.get('userId');
    if (userId) {
      try {
        const userData = await this.userService.getUserById(userId);
        this.user.set(userData);
        if (this.user().role_id === 1){
          this.role = 'Operador Autorizado'
        } else if (this.user().role_id === 2){
          this.role = 'Usuario Consulta'
        } else{
          this.role = 'Administrador'
        }
      } catch {
        this.user.set(null);
      }
    }
    this.loading.set(false);
  }
}
