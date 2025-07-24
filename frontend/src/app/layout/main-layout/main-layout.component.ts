import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButtons, IonMenuButton, IonContent, IonHeader, IonItem, IonMenu, IonTitle, IonToolbar, IonRouterOutlet, IonAccordion, IonAccordionGroup, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  standalone: true,
  imports: [IonButtons, IonMenuButton, IonMenu, IonHeader, IonTitle, IonContent, IonToolbar, IonItem, IonRouterOutlet, RouterLink, IonAccordion, IonAccordionGroup, IonLabel]
})
export class MainLayoutComponent implements OnInit {


  constructor() { }

  ngOnInit() { }


  logout() {
    throw new Error('Method not implemented.');
  }

}
