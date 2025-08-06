import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { resource } from '@angular/core';
import { TagService } from 'src/app/services/tag.service';
import { WebSocketService } from 'src/app/services/websocket.service';
import { RolePermissionService } from 'src/app/services/role-permission.service';
import { Tag } from 'src/app/model/tag';
import { UuidFormatPipe } from 'src/app/pipes/uuid-format.pipe';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
  IonContent,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonFab,
  IonFabButton,
  ToastController,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  addOutline,
  pricetagOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  banOutline,
  pawOutline,
  eyeOutline,
  radioButtonOffOutline,
  linkOutline,
  pencilOutline,
  trashOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-tag-list',
  standalone: true,
  templateUrl: './tag-list.page.html',
  styleUrls: ['./tag-list.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    UuidFormatPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonBadge,
    IonContent,
    IonSpinner,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonFab,
    IonFabButton,
  ],
})
export class TagListPage implements OnInit, OnDestroy {
  private tagService = inject(TagService);
  private wsService = inject(WebSocketService);
  private rolePermissionService = inject(RolePermissionService);
  private router = inject(Router);
  private title = inject(Title);
  private toastController = inject(ToastController);
  private modalController = inject(ModalController);
  private unsubscribe: (() => void) | null = null;

  // Role-based computed properties
  readonly permissions = computed(() =>
    this.rolePermissionService.permissions()
  );
  readonly canCreateTags = computed(() => this.permissions().canCreateTags);
  readonly canEditTags = computed(() => this.permissions().canEditTags);
  readonly canDeleteTags = computed(() => this.permissions().canDeleteTags);

  // Resource for loading tags
  tagsResource = resource<Tag[], undefined>({
    loader: () => this.tagService.getAllTags(),
  });

  constructor() {
    addIcons({
      homeOutline,
      addOutline,
      pricetagOutline,
      alertCircleOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      banOutline,
      pawOutline,
      eyeOutline,
      radioButtonOffOutline,
      linkOutline,
      pencilOutline,
      trashOutline,
    });
  }

  ngOnInit() {
    this.title.setTitle('Lista de Caravanas | Sistema de Trazabilidad');

    // Register WebSocket handler for tags updates
    this.unsubscribe = this.wsService.onMessage('tags', () => {
      console.log('Actualizando lista de caravanas por WebSocket');
      this.tagsResource.reload();
    });
  }

  ngOnDestroy() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  /**
   * Handle status change for a tag
   */
  async onStatusChange(tag: Tag, newStatus: string) {
    try {
      await this.tagService.updateTagStatus(tag.id, newStatus);
      
      // Map status to Spanish for user feedback
      const statusLabels: { [key: string]: string } = {
        'active': 'activo',
        'inactive': 'inactivo', 
        'retired': 'retirado'
      };
      
      await this.showToast(
        `Estado de caravana ${tag.tag_number} actualizado a ${statusLabels[newStatus] || newStatus}`,
        'success'
      );
      this.tagsResource.reload();
    } catch (error: any) {
      console.error('Error actualizando estado de caravana:', error);
      
      // Extract error message from backend response
      let errorMessage = 'Error al actualizar el estado de la caravana';
      if (error?.error?.message) {
        errorMessage = error.error.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      
      await this.showToast(errorMessage, 'danger');
      this.tagsResource.reload();
    }
  }

  /**
   * Navigate to animal detail page
   */
  goToAnimal(animalId: string) {
    this.router.navigate(['/animal', animalId]);
  }

  /**
   * Assign tag to an animal (placeholder - implement modal for animal selection)
   */
  assignTag(tag: Tag) {
    // TODO: Implement tag assignment modal
    console.log('Assigning tag:', tag.id);
  }

  /**
   * Edit tag (placeholder - implement edit functionality)
   */
  editTag(tag: Tag) {
    // TODO: Implement tag edit functionality
    console.log('Editing tag:', tag.id);
  }

  /**
   * Delete tag
   */
  async deleteTag(tag: Tag) {
    try {
      // TODO: Implement confirmation modal and delete service method
      console.log('Deleting tag:', tag.id);
      await this.showToast(
        `Función de eliminar caravana no implementada aún`,
        'warning'
      );
      // await this.tagService.deleteTag(tag.id);
      // await this.showToast(`Caravana ${tag.tag_number} eliminada`, 'success');
      // this.tagsResource.reload();
    } catch (error) {
      console.error('Error eliminando caravana:', error);
      await this.showToast('Error al eliminar la caravana', 'danger');
    }
  }

  /**
   * Navigate to create tag page
   */
  goToCreate() {
    // TODO: Implement navigation to create tag page
    console.log('Navigate to create tag');
  }

  /**
   * Reload the tags list
   */
  reload() {
    this.tagsResource.reload();
  }

  /**
   * Show toast message
   */
  private async showToast(
    message: string,
    color: 'success' | 'danger' | 'warning' = 'success'
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'bottom',
    });
    await toast.present();
  }
}
