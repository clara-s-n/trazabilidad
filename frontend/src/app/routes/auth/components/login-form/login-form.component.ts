import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCol, IonGrid, IonInput, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  imports: [IonRow, IonCol, IonButton, IonInput, IonGrid, FormsModule]
})
export class LoginFormComponent  implements OnInit {
  public usuario = signal("usuario");
  public contrasena = signal("contra");

  constructor() { }

  ngOnInit(): void {
    this.usuario.set("modificado")
  }

  onSubmit() {
    console.log({
      usuario : this.usuario(),
      contrasena : this.contrasena(),
    })
  }

}
function computed(arg0: () => void) {
  throw new Error('Function not implemented.');
}

