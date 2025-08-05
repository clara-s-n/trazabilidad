import { Component, inject, OnInit } from '@angular/core';
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
  ],
})
export class DashboardComponent implements OnInit {
  private router = inject(Router);
  private title = inject(Title);

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
