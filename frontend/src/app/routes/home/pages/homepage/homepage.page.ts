import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
  standalone: true,
})
export class HomepagePage  implements OnInit {

  constructor() { }

  ngOnInit() {
    // Aquí puedes inicializar cualquier dato o llamar a servicios necesarios
    console.log('HomepagePage initialized');
  }

}
