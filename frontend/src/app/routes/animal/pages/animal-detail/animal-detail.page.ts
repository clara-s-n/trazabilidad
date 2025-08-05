import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, input, OnInit, computed } from '@angular/core';
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
  ModalController,
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
export class DetailPage implements OnInit {
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
  public currentTag: Tag | null = null;

  private readonly animalService = inject(AnimalService);
  private readonly tagService = inject(TagService);
  private readonly modalController = inject(ModalController);
  private readonly title = inject(Title);
  private readonly mainStore = inject(MainStoreService);
  private readonly rolePermissionService = inject(RolePermissionService);

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
        // Obtener la caravana actual
        const currentTagResponse = await this.animalService.getCurrentTag(id);
        if (currentTagResponse && currentTagResponse.tag) {
          this.currentTag = currentTagResponse.tag; // Objeto completo
          this.animal.currentTag = currentTagResponse.tag; // <-- Guarda el objeto completo
        } else {
          this.currentTag = null;
          this.animal.currentTag = null;
        }
      } catch {
        this.animal = null;
      }
    }
    this.loading = false;
  }

  async openTagModal() {
    if (!this.animal) return;
    const modal = await this.modalController.create({
      component: ChangeTagStatusComponent,
      componentProps: {
        id: this.animal.id,
        tags: this.animal.currentTag ?? [], // <-- PASA LAS ASIGNACIONES ACTUALES
        isChange: !!this.currentTag, // true si hay tag actual, false si no
        oldTagId: this.currentTag ? this.currentTag.id : '', // <-- PASA LA TAG ACTUAL
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.refresh) {
      // Actualizar datos si es necesario
      await this.ngOnInit();
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
}
