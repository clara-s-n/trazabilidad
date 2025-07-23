import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { UpperCasePipe } from '@angular/common';
import {IonContent} from "@ionic/angular/standalone";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [LoginFormComponent, UpperCasePipe, IonContent]
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
    // Aquí puedes inicializar cualquier dato o llamar a servicios necesarios
    console.log('LoginPage initialized');
  }

}
