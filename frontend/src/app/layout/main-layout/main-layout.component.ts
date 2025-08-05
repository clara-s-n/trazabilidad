import { Component, inject, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBadge,
} from '@ionic/angular/standalone';
import { LogoutButtonComponent } from 'src/app/components/logout-button/logout-button.component';
import { RolePermissionService } from 'src/app/services/role-permission.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBadge,
    LogoutButtonComponent,
  ],
})
export class MainLayoutComponent {
  private rolePermissionService = inject(RolePermissionService);
  
  readonly roleName = computed(() => this.rolePermissionService.getRoleName());
  
  constructor() {}
}
