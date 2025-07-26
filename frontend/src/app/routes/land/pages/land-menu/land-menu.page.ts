import {Component, inject, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-land-menu',
  templateUrl: './land-menu.page.html',
  styleUrls: ['./land-menu.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    //IonContent,
    IonButton
  ]
})
export class LandMenuPage  implements OnInit {
  private router: Router = inject(Router);

  ngOnInit() {
    console.log('Holis desde land page menus')
  }

  goToList() {
    this.router.navigate(['/predios/list']);
  }

  goToCreate() {
    this.router.navigate(['/predios/create']);
  }
}
