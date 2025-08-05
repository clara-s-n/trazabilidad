import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
} from '@ionic/angular/standalone';
import { LogoutButtonComponent } from 'src/app/components/logout-button/logout-button.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    IonApp,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    LogoutButtonComponent,
  ],
})
export class MainLayoutComponent {
  constructor() {}
}
