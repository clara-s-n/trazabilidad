import { Component, inject, OnInit } from '@angular/core';
import { UserFormComponent } from '../components/user-form/user-form.component';
import { AnimalPost } from 'src/app/model/animalPost';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.page.html',
  styleUrls: ['./crear.page.scss'],
  standalone: true,
  imports: [UserFormComponent]
})
export class CrearPage {

  private animalService = inject(AnimalService);

  public animal: AnimalPost = {
    breed: '',
    birth_date:'',
    owner_id: '',
    land_id: '',
    status: '',
  }

  constructor() { }

  async cambios (animal: AnimalPost){
    const usuarioCreado = this.animalService.postAnimal(animal);
    console.log({usuarioCreado})
  }

}
