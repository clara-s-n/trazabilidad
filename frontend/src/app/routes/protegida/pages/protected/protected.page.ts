import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.page.html',
  styleUrls: ['./protected.page.scss'],
  standalone: true,
})
export class ProtectedPage  implements OnInit {

  constructor() { }

  ngOnInit() {
    // Aquí puedes inicializar cualquier dato o llamar a servicios necesarios
    console.log('ProtectedPage initialized');
  }

}
