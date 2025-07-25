import { JsonPipe } from '@angular/common';
import { Component, inject, resource } from '@angular/core';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.page.html',
  styleUrls: ['./animals.page.scss'],
  standalone: true,
  imports: [JsonPipe]
})
export class AnimalsPage  {

  private animalService = inject(AnimalService)


  public animalesSignal = resource({
    loader: () => this.animalService.getAll()
  });
}
