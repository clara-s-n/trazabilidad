import { Component, inject, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBadge,
  IonMenuButton,
  IonSplitPane,
} from '@ionic/angular/standalone';
import { LogoutButtonComponent } from 'src/app/components/logout-button/logout-button.component';
import { SideMenuComponent } from 'src/app/components/side-menu/side-menu.component';
import { RolePermissionService } from 'src/app/services/role-permission.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBadge,
    IonMenuButton,
    LogoutButtonComponent,
    SideMenuComponent,
  ],
})
export class MainLayoutComponent {
  private rolePermissionService = inject(RolePermissionService);
  
  readonly roleName = computed(() => this.rolePermissionService.getRoleName());
  
  constructor() {}
}
