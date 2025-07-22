import { Component, OnInit } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports : [LoginFormComponent]
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {}

}
