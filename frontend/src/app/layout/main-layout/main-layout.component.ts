import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonRouterOutlet,
  IonAccordionGroup,
  IonAccordion,
  IonLabel,
  IonItemDivider
} from '@ionic/angular/standalone';

import { MenuSection } from 'src/app/model/components/menuSection';
import { MainStoreService } from 'src/app/services/main-store.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,           // importa el módulo completo de Ionic
    IonMenu,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonRouterOutlet,
    IonAccordionGroup,
    IonAccordion,
    IonLabel,
    IonItemDivider,
    RouterLink
  ],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})

export class MainLayoutComponent implements OnInit {
  private mainStoreService = new MainStoreService();

  public sections: MenuSection[] = [
    { label: 'Animales', color: 'tertiary', items: [
        { label: 'Lista de animales', link: '/animal/list' },
        { label: 'Crear un animal',   link: '/animal/create' }
      ]
    },
    { label: 'Predios', color: 'light', items: [
        { label: 'Lista de predios',  link: '/land/list' }
      ]
    },
    { label: 'Usuarios', color: 'light', items: [
        { label: 'Lista de usuarios', link: '/user/list' },
        { label: 'Crear un usuario',  link: '/auth/register' }
      ]
    },
    { label: 'Eventos', color: 'light', items: [
        { label: 'Lista de eventos',  link: '/evento/pesaje/list' }
      ]
    }
  ];

  constructor() {}

  ngOnInit() {}

  logout() {
    this.mainStoreService.clearAuth();
  }
}