import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/model/animal';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss'],
  standalone: true,
})
export class AnimalFormComponent {
  public animal = input<Animal | null>(null);

  public breed = ;
  public birth_date;
  public owner_id
  public land_id
}
