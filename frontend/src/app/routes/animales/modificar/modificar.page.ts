import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from '../components/user-form/user-form.component';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
  standalone: true,
  imports: [UserFormComponent]
})
export class ModificarPage  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
