import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-land',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: true,
})
export class CreatePage  implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("holis");
  }

}
