import { CommonModule } from '@angular/common';
import { Component, inject, resource, OnInit, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonBadge,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  eyeOutline,
  pencilOutline,
  homeOutline,
} from 'ionicons/icons';
import { Animal } from 'src/app/model/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { RolePermissionService } from 'src/app/services/role-permission.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonContent,
    IonSpinner,
    IonRow,
    IonIcon,
    IonCol,
    IonFab,
    IonFabButton,
    IonGrid,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonBadge,
  ],
})
export class ListPage implements OnInit {
  private router = inject(Router);
  private animalService = inject(AnimalService);
  private title = inject(Title);
  private rolePermissionService = inject(RolePermissionService);

  // Role-based computed properties
  readonly permissions = computed(() => this.rolePermissionService.permissions());
  readonly canCreateAnimals = computed(() => this.permissions().canCreateAnimals);
  readonly canEditAnimals = computed(() => this.permissions().canEditAnimals);

  constructor() {
    addIcons({
      eyeOutline,
      pencilOutline,
      addOutline,
      homeOutline,
    });
  }

  ngOnInit() {
    this.title.setTitle('Lista de Animales | Sistema de Trazabilidad');
  }

  public animalsResource = resource({
    loader: async () => await this.animalService.getAllAnimals(),
  });

  goToSpecificAnimal(animal: Animal) {
    this.router.navigate([`/animal/${animal.id}`]);
  }

  goToEdit(animal: Animal) {
    this.router.navigate([`/animal/edit/${animal.id}`]);
  }

  goToCreate() {
    this.router.navigate(['/animal/create']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  reload() {
    this.animalsResource.reload();
  }
}
