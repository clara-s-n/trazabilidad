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
  IonRouterOutlet,
} from '@ionic/angular/standalone';
import { LogoutButtonComponent } from '../../components/logout-button/logout-button.component';
import { SideMenuComponent } from '../../components/side-menu/side-menu.component';
import { RolePermissionService } from '../../services/role-permission.service';

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
    IonRouterOutlet
  ],
})
export class MainLayoutComponent {
  private rolePermissionService = inject(RolePermissionService);
  
  readonly roleName = computed(() => this.rolePermissionService.getRoleName());
  
  constructor() {}
}
