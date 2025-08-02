import { Component, OnInit } from '@angular/core';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-animal-edit',
  templateUrl: './animal-edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: true,
  imports: [
    // IonHeader,
    // IonToolbar,
    // IonButtons,
    // IonBackButton,
    // IonTitle,
    // IonContent,
  ],
})
export class EditPage implements OnInit {
  ngOnInit(): void {}
}
