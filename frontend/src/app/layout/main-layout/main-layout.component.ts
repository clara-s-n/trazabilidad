import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MainStoreService } from 'src/app/services/main-store.service';
import { CommonModule } from '@angular/common';
import {
  IonAccordion,
  IonAccordionGroup,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { MenuSection } from 'src/app/model/components/menuSection';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    IonButtons,
    IonMenuButton,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonRouterOutlet,
    IonAccordionGroup,
    IonAccordion,
    IonLabel,
    IonItemDivider,
    RouterLink,
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {
  private mainStoreService = inject(MainStoreService);
  private router = inject(Router);

  public sections: MenuSection[] = [
    {
      label: 'Animales',
      color: 'tertiary',
      items: [
        { label: 'Lista de animales', link: '/animal/list' },
        { label: 'Crear un animal', link: '/animal/create' },
      ],
    },
    {
      label: 'Predios',
      color: 'light',
      items: [{ label: 'Lista de predios', link: '/land/list' }],
    },
    {
      label: 'Usuarios',
      color: 'light',
      items: [
        { label: 'Lista de usuarios', link: '/user/list' },
        { label: 'Crear un usuario', link: '/auth/register' },
      ],
    },
    {
      label: 'Eventos',
      color: 'light',
      items: [{ label: 'Lista de eventos', link: '/evento/pesaje/list' }],
    },
  ];

  constructor() {}

  logout() {
    this.mainStoreService.clearAuth();
    this.router.navigate(['/']);
  }
}
