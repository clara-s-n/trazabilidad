
import { Component } from '@angular/core';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { IonApp } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [MainLayoutComponent, IonApp],
})
export class AppComponent {
  
}
