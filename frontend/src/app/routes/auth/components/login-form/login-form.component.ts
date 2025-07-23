import { Component, OnInit } from '@angular/core';
import {IonButton, IonCol, IonInput, IonItem, IonRow, IonText,} from "@ionic/angular/standalone";
import {FormsModule} from "@angular/forms";
import {UserLogin} from "../../../../model/user";
import { signal, computed } from "@angular/core";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  standalone: true,
  imports: [
    IonInput,
    FormsModule,
    IonButton,
    IonItem,
    IonText,
    IonRow,
    IonCol
  ]
})
export class LoginFormComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('LoginFormComponent initialized');
    this.user.set({
      email: 'hello',
      password: 'from the other side'
    })
  }

  user = signal<UserLogin>({
    email: '',
    password: ''
  });



  login(){
    console.log('Login button clicked');
    console.log(this.user);
  }
}
