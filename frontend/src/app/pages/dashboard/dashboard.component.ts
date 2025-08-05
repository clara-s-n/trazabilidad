import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
export class DashboardComponent {
  private router = inject(Router);

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

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
