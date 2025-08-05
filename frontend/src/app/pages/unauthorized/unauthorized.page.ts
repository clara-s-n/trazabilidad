import { Component, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { lockClosedOutline, homeOutline, informationCircleOutline } from 'ionicons/icons';
import { RolePermissionService } from 'src/app/services/role-permission.service';

@Component({
  selector: 'app-unauthorized',
  template: `
    <ion-header>
      <ion-toolbar color="danger">
        <ion-title>Acceso Denegado</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-header>
          <div class="text-center">
            <ion-icon name="lock-closed-outline" size="large" color="danger"></ion-icon>
          </div>
          <ion-card-title class="text-center">No tienes permiso para acceder a esta página</ion-card-title>
        </ion-card-header>
        
        <ion-card-content>
          <p>Tu rol actual (<strong>{{ roleName() }}</strong>) no tiene los privilegios necesarios para ver este contenido.</p>
          
          <ion-card>
            <ion-card-header>
              <ion-card-title color="primary">
                <ion-icon name="information-circle-outline"></ion-icon>
                Información de tu rol
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-list>
                <ion-item>
                  <ion-label>
                    <h3>Rol actual</h3>
                    <p>{{ roleName() }}</p>
                  </ion-label>
                  <ion-badge slot="end" color="primary">{{ roleName() }}</ion-badge>
                </ion-item>
                
                <ion-item>
                  <ion-label>
                    <h3>Permisos disponibles</h3>
                    <p>Consulta las secciones que puedes acceder desde el dashboard</p>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>
          
          <p>Por favor contacta al administrador si consideras que esto es un error.</p>
          
          <div class="ion-padding-top">
            <ion-button expand="block" (click)="goToDashboard()">
              <ion-icon slot="start" name="home-outline"></ion-icon>
              Volver al Dashboard
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `,
  styles: [`
    .text-center {
      text-align: center;
    }
    
    ion-card {
      margin-top: 2rem;
    }
    
    ion-icon[size="large"] {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
  `],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonBadge,
  ]
})
export class UnauthorizedPage {
  private router = inject(Router);
  private rolePermissionService = inject(RolePermissionService);
  
  readonly roleName = computed(() => this.rolePermissionService.getRoleName());
  
  constructor() {
    addIcons({ lockClosedOutline, homeOutline, informationCircleOutline });
  }
  
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
