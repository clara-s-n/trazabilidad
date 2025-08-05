import { Component, inject, OnInit, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonBadge,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  pawOutline,
  businessOutline,
  peopleOutline,
  pricetagOutline,
  statsChartOutline,
  documentTextOutline,
} from 'ionicons/icons';
import { MainStoreService } from 'src/app/services/main-store.service';
import { RolePermissionService } from 'src/app/services/role-permission.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonBadge,
  ],
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  private title = inject(Title);
  private mainStore = inject(MainStoreService);
  private rolePermissionService = inject(RolePermissionService);

  // Role-based computed properties
  readonly isAdmin = computed(() => this.mainStore.isAdmin());
  readonly canEditAnimals = computed(() => this.mainStore.isOperatorOrAdmin());
  readonly isConsulta = computed(() => this.mainStore.userRoleId() === 2);
  readonly permissions = computed(() => this.rolePermissionService.permissions());
  readonly roleName = computed(() => this.rolePermissionService.getRoleName());

  constructor() {
    addIcons({
      pawOutline,
      businessOutline,
      peopleOutline,
      pricetagOutline,
      statsChartOutline,
      documentTextOutline,
    });
  }

  ngOnInit() {
    this.title.setTitle('Panel de Control | Sistema de Trazabilidad');
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
