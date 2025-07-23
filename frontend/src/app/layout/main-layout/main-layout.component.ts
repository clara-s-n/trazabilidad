import { Component, OnInit } from '@angular/core';
import { IonButtons, IonMenuButton, IonContent, IonHeader, IonItem, IonList, IonMenu, IonTitle, IonToolbar, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [IonButtons, IonMenuButton, IonMenu, IonHeader, IonTitle, IonContent, IonList, IonToolbar, IonItem, IonRouterOutlet]
})
export class MainLayoutComponent implements OnInit {


  constructor() { }

  ngOnInit() { }


  logout() {
    throw new Error('Method not implemented.');
  }

}
