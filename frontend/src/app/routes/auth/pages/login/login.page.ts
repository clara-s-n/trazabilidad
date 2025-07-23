import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { UpperCasePipe } from '@angular/common';
import { IonContent, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports : [LoginFormComponent, UpperCasePipe, IonContent]
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {}

}
