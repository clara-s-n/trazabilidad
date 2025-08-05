import { Component, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonButton,
  IonIcon,
  IonMenuButton,
  IonButtons,
  IonItem,
  IonLabel,
  IonItemDivider
} from '@ionic/angular/standalone';
import { AccordionMenuComponent } from '../accordion-menu/accordion-menu.component';
import { MenuItem } from '../../model/components/menuItem';
import { AuthService } from '../../services/auth.service';
import { MainStoreService } from '../../services/main-store.service';
import { addIcons } from 'ionicons';
import { logOutOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonButton,
    IonIcon,
    IonMenuButton,
    IonButtons,
    IonItem,
    IonLabel,
    IonItemDivider,
    AccordionMenuComponent
  ],
  template: `
    <ion-menu side="start" menuId="main-menu" contentId="main-content">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Sistema de Trazabilidad</ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content>
        <!-- User info section -->
        <div class="user-info-section">
          <ion-item lines="none">
            <ion-icon slot="start" name="person-outline" color="primary"></ion-icon>
            <ion-label>
              <h3>{{ userEmail() }}</h3>
              <div class="role-badge">
                <span class="role-text">{{ getRoleDisplayName() }}</span>
              </div>
            </ion-label>
          </ion-item>
        </div>

        <!-- Accordion navigation menu -->
        <app-accordion-menu [items]="menuItems()"></app-accordion-menu>
      </ion-content>
      
      <!-- Menu footer with logout -->
      <div class="menu-footer">
        <ion-menu-toggle>
          <ion-button 
            expand="block" 
            color="danger" 
            fill="clear"
            (click)="logout()">
            <ion-icon slot="start" name="log-out-outline"></ion-icon>
            Cerrar Sesión
          </ion-button>
        </ion-menu-toggle>
      </div>
    </ion-menu>
  `,
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  private authService = inject(AuthService);
  private mainStore = inject(MainStoreService);
  private router = inject(Router);

  // User info computed properties
  readonly userEmail = computed(() => this.mainStore.userEmail() || 'Usuario');
  readonly userRoleId = computed(() => this.mainStore.userRoleId());

  // Role-based menu items using MainStoreService computed properties
  readonly menuItems = computed<MenuItem[]>(() => {
    const baseItems: MenuItem[] = [
      { label: 'Dashboard', link: '/dashboard' }
    ];

    // Animal section - all users can view
    baseItems.push({ label: 'Lista de animales', link: '/animal/list' });
    
    // Admin and Operator can create/edit animals
    if (this.mainStore.isOperatorOrAdmin()) {
      baseItems.push({ label: 'Crear animal', link: '/animal/create' });
    }

    // Land section - all users can view
    baseItems.push({ label: 'Lista de predios', link: '/land/list' });
    
    // Admin and Operator can create/edit lands
    if (this.mainStore.isOperatorOrAdmin()) {
      baseItems.push({ label: 'Crear predio', link: '/land/create' });
    }

    // Tag section - only admin and operator
    if (this.mainStore.isOperatorOrAdmin()) {
      baseItems.push({ label: 'Lista de caravanas', link: '/tag/list' });
    }

    // User management - only admin
    if (this.mainStore.isAdmin()) {
      baseItems.push({ label: 'Lista de usuarios', link: '/user/list' });
      baseItems.push({ label: 'Crear usuario', link: '/user/create' });
    }

    // Reports - all users
    baseItems.push({ label: 'Reportes', link: '/reports' });

    // Help - all users
    baseItems.push({ label: 'Ayuda', link: '/help' });

    return baseItems;
  });

  constructor() {
    addIcons({
      logOutOutline,
      personOutline
    });
  }

  getRoleDisplayName(): string {
    const roleId = this.userRoleId();
    switch (roleId) {
      case 1: return 'Operador';
      case 2: return 'Consulta';
      case 3: return 'Administrador';
      default: return 'Usuario';
    }
  }

  goToProfile() {
    const userId = this.mainStore.userId();
    if (userId) {
      this.router.navigate(['/user/profile', userId]);
    }
  }

  logout() {
    this.authService.logout();
  }
}