import { Component } from '@angular/core';
import {
  IonApp,
  IonMenu,
  IonContent,
  IonRouterOutlet,
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonList, IonButton
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonMenu, IonContent, IonRouterOutlet, IonHeader, IonToolbar, IonButtons, IonTitle, IonList, IonButton, IonMenuButton, RouterLink],
})
export class AppComponent {
  constructor() {
  }
}
