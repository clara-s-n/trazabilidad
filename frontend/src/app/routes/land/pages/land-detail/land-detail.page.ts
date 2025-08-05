import { Component, inject, OnInit, signal } from '@angular/core';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { Land } from '../../../../model/land';
import { Animal } from '../../../../model/animal';
import { ActivatedRoute, Router } from '@angular/router';
import { LandsService } from '../../../../services/lands.service';
import { DeleteLandModalComponent } from '../../components/delete-land-modal/delete-land-modal.component';
import { addIcons } from 'ionicons';
import {
  locationOutline,
  resizeOutline,
  pawOutline,
  imageOutline,
} from 'ionicons/icons';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-land-detail',
  templateUrl: './land-detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonSpinner,
    IonText,
  ],
})
export class DetailPage implements OnInit {
  public land = signal<Land | null>(null);
  public landAnimals = signal<Animal[]>([]);
  public isLoadingAnimals = signal<boolean>(false);

  private landsService = inject(LandsService);
  private route = inject(ActivatedRoute);
  private modalController = inject(ModalController);
  private router = inject(Router);

  constructor() {
    addIcons({
      locationOutline,
      resizeOutline,
      pawOutline,
      imageOutline,
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadLand(id);
    this.loadLandAnimals(id);
  }

  private async loadLand(id: string) {
    try {
      const landData = await this.landsService.getLand(id);
      this.land.set(landData);
    } catch (error) {
      console.error('Error loading land:', error);
      this.router.navigate(['/land/list']);
    }
  }

  private async loadLandAnimals(id: string) {
    this.isLoadingAnimals.set(true);
    try {
      const animals = await this.landsService.getLandAnimals(id);
      this.landAnimals.set(animals);
    } catch (error) {
      console.error('Error loading land animals:', error);
      this.landAnimals.set([]);
    } finally {
      this.isLoadingAnimals.set(false);
    }
  }

  goBack() {
    this.router.navigate(['/land/list']);
  }

  goEdit() {
    const id = this.land()?.id;
    if (id) this.router.navigate(['/land/edit', id]);
  }

  goToAnimal(animalId: string) {
    this.router.navigate(['/animal', animalId]);
  }

  async confirmDelete() {
    const current = this.land();
    if (!current) return;

    const animals = this.landAnimals();
    if (animals.length > 0) {
      // Show error if trying to delete land with animals
      alert(
        `No se puede eliminar el predio porque tiene ${animals.length} animal(es) asignado(s).`
      );
      return;
    }

    const modal = await this.modalController.create({
      component: DeleteLandModalComponent,
      componentProps: { land: current },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.confirm) {
      await this.landsService.deleteLand({ land_id: current.id });
      this.router.navigate(['/land/list']);
    }
  }

  // Helper method to format coordinates
  formatCoordinate(value: number, isLatitude: boolean): string {
    const direction = isLatitude
      ? value >= 0
        ? 'N'
        : 'S'
      : value >= 0
      ? 'E'
      : 'W';
    return `${Math.abs(value).toFixed(6)}° ${direction}`;
  }

  getImageUrl(imagePath: string | undefined): string {
    if (!imagePath) return 'assets/images/placeholder-land.jpg';

    // If the path is a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    // Otherwise, construct the URL using the backend API URL
    return `${environment.apiUrl}public/${imagePath}`;
  }

  onImageError(event: any) {
    // Replace broken image with placeholder
    event.target.src = 'assets/images/placeholder-land.jpg';
  }
}
