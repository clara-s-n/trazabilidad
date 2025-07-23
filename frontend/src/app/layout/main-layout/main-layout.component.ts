import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { IonApp, IonContent, IonHeader, IonItem, IonList, IonMenu, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [IonApp, IonMenu, IonHeader, IonTitle, IonContent, IonList, IonToolbar, IonItem, IonRouterOutlet, IonicModule]
})
export class MainLayoutComponent implements OnInit {


  constructor() { }

  ngOnInit() { }


  logout() {
    throw new Error('Method not implemented.');
  }

}
