import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, input, OnInit, OnDestroy, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonButton,
  IonCol,
  IonRow,
  IonSpinner,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonList,
  IonLabel,
  IonGrid,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  pencilOutline,
  timeOutline,
  moveOutline,
  scaleOutline,
  medicalOutline,
  cashOutline,
  arrowBackOutline,
  listOutline,
} from 'ionicons/icons';
import { AnimalService } from 'src/app/services/animal.service';
import { TagService } from 'src/app/services/tag.service';
import { MainStoreService } from 'src/app/services/main-store.service';
import { RolePermissionService } from 'src/app/services/role-permission.service';
import { ChangeTagStatusComponent } from '../../components/change-tag-status/change-tag-status.component';
import { TagHistoryComponent } from '../../components/tag-history/tag-history.component';
import { CompleteAnimal } from 'src/app/model/animal';
import { Tag } from 'src/app/model/tag';
import { ModalController } from '@ionic/angular';
import { WebSocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    DatePipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonButton,
    IonCol,
    IonRow,
    IonSpinner,
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    IonList,
    IonLabel,
    IonGrid,
  ],
})
export class DetailPage implements OnInit, OnDestroy {
  constructor() {
    addIcons({
      pencilOutline,
      timeOutline,
      moveOutline,
      scaleOutline,
      medicalOutline,
      cashOutline,
      arrowBackOutline,
      listOutline,
    });
  }
  public animal_id = input.required<string>();
  public router = inject(Router);

  // Use signals for reactive state management
  readonly currentTag = signal<Tag | null>(null);
  readonly needsTagAssignment = signal<boolean>(false);
  readonly isLoadingTag = signal<boolean>(false);

  private readonly animalService = inject(AnimalService);
  private readonly tagService = inject(TagService);
  private modalController = inject(ModalController);
  private readonly toastController = inject(ToastController);
  private readonly title = inject(Title);
  private readonly mainStore = inject(MainStoreService);
  private readonly rolePermissionService = inject(RolePermissionService);
  private readonly wsService = inject(WebSocketService);
  private unsubscribeAnimals: (() => void) | null = null;
  private unsubscribeTags: (() => void) | null = null;

  animal: CompleteAnimal | null = null;
  loading = false;

  // Role-based computed properties using the permission service
  readonly permissions = computed(() => this.rolePermissionService.permissions());
  readonly canEditAnimals = computed(() => this.permissions().canEditAnimals);
  readonly canManageEvents = computed(() => this.permissions().canManageEvents);
  readonly isAdmin = computed(() => this.mainStore.isAdmin());
  readonly isConsulta = computed(() => this.mainStore.userRoleId() === 2);

  async ngOnInit() {
    this.title.setTitle('Detalle del Animal | Sistema de Trazabilidad');
    this.loading = true;
    const id = this.animal_id();
    if (id) {
      try {
        this.animal = await this.animalService.getCompleteAnimal(id);
        // Load the current tag with improved error handling
        await this.loadCurrentTag(id);
        console.log('Animal loaded:', this.animal);
      } catch (error) {
        console.error('Error loading animal details:', error);
        this.animal = null;
        await this.showToast('Error al cargar los datos del animal', 'danger');
      } finally {
        this.loading = false;
      }
    }

    // Registrar handlers para WebSocket
    this.unsubscribeAnimals = this.wsService.onMessage('animals', () => {
      console.log('Actualizando detalle de animal por WebSocket');
      this.reloadAnimalData();
    });

    this.unsubscribeTags = this.wsService.onMessage('tags', () => {
      console.log('Actualizando tags de animal por WebSocket');
      this.reloadCurrentTag();
    });
  }

  ngOnDestroy() {
    // Desregistrar los handlers cuando se destruye el componente
    if (this.unsubscribeAnimals) {
      this.unsubscribeAnimals();
    }
    if (this.unsubscribeTags) {
      this.unsubscribeTags();
    }
  }

  /**
   * Loads the current tag for the animal with proper error handling
   */
  async loadCurrentTag(animalId: string): Promise<void> {
    this.isLoadingTag.set(true);
    try {
      const response = await this.animalService.getCurrentTag(animalId);
      if (response && response.currentTag) {
        // Store the tag in signal and in animal object
        this.currentTag.set(response.currentTag);
        if (this.animal) {
          this.animal.currentTag = response.currentTag;
        }
        // Reset assignment flag since we have a tag
        this.needsTagAssignment.set(false);
      } else {
        // No tag present in the response
        this.currentTag.set(null);
        if (this.animal) {
          this.animal.currentTag = null;
        }
        this.needsTagAssignment.set(true);
      }
    } catch (error: any) {
      // Handle specific 404 error for missing tag
      if (error.status === 404) {
        this.currentTag.set(null);
        if (this.animal) {
          this.animal.currentTag = null;
        }
        this.needsTagAssignment.set(true);
      } else {
        console.error('Error loading current tag:', error);
        await this.showToast('Error al cargar la caravana actual', 'danger');
      }
    } finally {
      this.isLoadingTag.set(false);
    }
  }

  async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }

  async openTagModal() {
    if (!this.animal) return;
    const modal = await this.modalController.create({
      component: ChangeTagStatusComponent,
      componentProps: {
        id: this.animal.id,
        tags: this.animal.currentTag ?? [], // <-- PASA LAS ASIGNACIONES ACTUALES
        isChange: this.currentTag() !== null, // true si hay tag actual, false si no
        oldTagId: this.currentTag() ? this.currentTag()!.id : '', // <-- PASA LA TAG ACTUAL
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.refresh) {
      // Reload tag data after assignment/change
      await this.loadCurrentTag(this.animal.id);
    }
  }

  async openTagHistoryModal() {
    if (!this.animal) return;
    const modal = await this.modalController.create({
      component: TagHistoryComponent,
      componentProps: { animal: this.animal },
    });
    await modal.present();
  }

  goToEdit() {
    if (this.animal && this.canEditAnimals()) {
      this.router.navigate(['/animal/edit', this.animal.id]);
    }
  }

  goToHistory() {
    if (this.animal) {
      this.router.navigate(['/animal/history', this.animal.id]);
    }
  }

  goToMovements() {
    if (this.animal) {
      this.router.navigate(['/animal/movements', this.animal.id]);
    }
  }

  goToWeighings() {
    if (this.animal) {
      this.router.navigate(['/animal/events', this.animal.id, 'weighing']);
    }
  }

  goToVaccinations() {
    if (this.animal) {
      this.router.navigate(['/animal/events', this.animal.id, 'vaccination']);
    }
  }

  goToSales() {
    if (this.animal) {
      this.router.navigate(['/animal/events', this.animal.id, 'sale']);
    }
  }

  goBack() {
    this.router.navigate(['/animal/list']);
  }

  // Métodos para recargar datos por WebSocket
  private async reloadAnimalData() {
    const id = this.animal_id();
    if (id) {
      try {
        this.animal = await this.animalService.getCompleteAnimal(id);
      } catch (error) {
        console.error('Error recargando datos del animal:', error);
      }
    }
  }

  private async reloadCurrentTag() {
    const id = this.animal_id();
    if (id) {
      await this.loadCurrentTag(id);
    }
  }
}
