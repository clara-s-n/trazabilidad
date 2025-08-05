import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonListHeader,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  pawOutline,
  businessOutline,
  peopleOutline,
  pricetagOutline,
  layersOutline,
} from 'ionicons/icons';
import { RolePermissionService } from '../../services/role-permission.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonListHeader,
  ],
})
export class SideMenuComponent {
  private rolePermissionService = inject(RolePermissionService);
  private router = inject(Router);

  readonly permissions = computed(() => this.rolePermissionService.permissions());

  constructor() {
    addIcons({
      homeOutline,
      pawOutline,
      businessOutline,
      peopleOutline,
      pricetagOutline,
      layersOutline,
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
