
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonApp, IonButton, IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet, IonButton, IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonTitle, IonToolbar, RouterLink],
})
export class AppComponent {
  
}
