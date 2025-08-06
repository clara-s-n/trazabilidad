import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonIcon,
  IonSpinner,
  IonText,
  IonList,
  IonCheckbox,
  IonSearchbar,
  IonChip,
  LoadingController,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, alertCircle, save, close, search, checkmark } from 'ionicons/icons';

import { Animal } from '../../../../model/animal';
import { AnimalService } from '../../../../services/animal.service';
import { AnimalBulkService, BulkAnimalUpdate, BulkOperationResult, BulkValidationInfo } from '../../../../services/animal-bulk.service';

@Component({
  selector: 'app-animal-bulk-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonIcon,
    IonSpinner,
    IonText,
    IonList,
    IonCheckbox,
    IonSearchbar,
    IonChip
  ],
  templateUrl: './animal-bulk-edit.page.html',
  styleUrls: ['./animal-bulk-edit.page.scss']
})
export class AnimalBulkEditPage implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private title = inject(Title);
  private animalService = inject(AnimalService);
  private animalBulkService = inject(AnimalBulkService);
  private loadingController = inject(LoadingController);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);

  // State
  loading = signal(false);
  allAnimals = signal<Animal[]>([]);
  filteredAnimals = signal<Animal[]>([]);
  selectedAnimalIds = signal<Set<string>>(new Set());
  validationInfo = signal<BulkValidationInfo | null>(null);
  searchTerm = signal('');
  
  // Form
  updateForm!: FormGroup;
  
  // Results
  showResults = signal(false);
  lastResult = signal<BulkOperationResult | null>(null);

  // Computed
  selectedCount = computed(() => this.selectedAnimalIds().size);
  canUpdate = computed(() => this.selectedCount() > 0 && this.updateForm?.valid);

  constructor() {
    addIcons({ checkmarkCircle, alertCircle, save, close, search, checkmark });
  }

  ngOnInit() {
    this.title.setTitle('Edición Masiva de Animales | Sistema de Trazabilidad');
    this.initializeForm();
    this.loadData();
  }

  private initializeForm() {
    this.updateForm = this.fb.group({
      breed: [''],
      owner_id: [''],
      land_id: [''],
      status: ['']
    });
  }

  private async loadData() {
    this.loading.set(true);
    try {
      const [animals, validationInfo] = await Promise.all([
        this.animalService.getAllAnimals(),
        this.animalBulkService.getBulkValidationInfo()
      ]);
      
      this.allAnimals.set(animals);
      this.filteredAnimals.set(animals);
      this.validationInfo.set(validationInfo);
    } catch (error) {
      console.error('Error loading data:', error);
      await this.showToast('Error cargando datos', 'danger');
    } finally {
      this.loading.set(false);
    }
  }

  onSearchChange(event: any) {
    const term = event.target.value?.toLowerCase() || '';
    this.searchTerm.set(term);
    
    if (!term) {
      this.filteredAnimals.set(this.allAnimals());
      return;
    }
    
    const filtered = this.allAnimals().filter(animal => 
      animal.breed.toLowerCase().includes(term) ||
      animal.status.toLowerCase().includes(term) ||
      animal.birth_date.includes(term)
    );
    
    this.filteredAnimals.set(filtered);
  }

  toggleAnimalSelection(animalId: string) {
    const currentSelected = new Set(this.selectedAnimalIds());
    
    if (currentSelected.has(animalId)) {
      currentSelected.delete(animalId);
    } else {
      currentSelected.add(animalId);
    }
    
    this.selectedAnimalIds.set(currentSelected);
  }

  selectAll() {
    const allIds = new Set(this.filteredAnimals().map(animal => animal.id));
    this.selectedAnimalIds.set(allIds);
  }

  selectNone() {
    this.selectedAnimalIds.set(new Set());
  }

  isAnimalSelected(animalId: string): boolean {
    return this.selectedAnimalIds().has(animalId);
  }

  async onSubmit() {
    if (!this.canUpdate()) {
      await this.showToast('Seleccione animales y al menos un campo para actualizar', 'warning');
      return;
    }

    // Get only non-empty values
    const formValues = this.updateForm.value;
    const updates: any = {};
    
    Object.keys(formValues).forEach(key => {
      if (formValues[key] && formValues[key] !== '') {
        updates[key] = formValues[key];
      }
    });

    if (Object.keys(updates).length === 0) {
      await this.showToast('Debe seleccionar al menos un campo para actualizar', 'warning');
      return;
    }

    const updateData: BulkAnimalUpdate = {
      animal_ids: Array.from(this.selectedAnimalIds()),
      updates
    };

    // Confirm update
    const alert = await this.alertController.create({
      header: 'Confirmar Actualización Masiva',
      message: `¿Está seguro que desea actualizar ${updateData.animal_ids.length} animales con los campos seleccionados?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Actualizar',
          handler: () => {
            this.performUpdate(updateData);
          }
        }
      ]
    });
    
    await alert.present();
  }

  private async performUpdate(updateData: BulkAnimalUpdate) {
    this.loading.set(true);
    const loadingEl = await this.loadingController.create({
      message: 'Actualizando animales...',
      spinner: 'crescent'
    });
    await loadingEl.present();

    try {
      const result = await this.animalBulkService.bulkUpdateAnimals(updateData);
      
      this.lastResult.set(result);
      this.showResults.set(true);
      
      if (result.success) {
        await this.showToast(`${result.successful} animales actualizados exitosamente`, 'success');
        // Reload animals to show updated data
        await this.loadData();
        // Clear selections
        this.selectedAnimalIds.set(new Set());
        this.updateForm.reset();
      } else {
        await this.showToast(
          `${result.successful} exitosos, ${result.failed} con errores`, 
          'warning'
        );
      }
    } catch (error: any) {
      console.error('Error updating animals:', error);
      await this.showToast('Error al actualizar animales: ' + (error.message || 'Error desconocido'), 'danger');
    } finally {
      this.loading.set(false);
      await loadingEl.dismiss();
    }
  }

  getFieldDisplayValue(field: string, value: string): string {
    const validationInfo = this.validationInfo();
    if (!validationInfo) return value;

    switch (field) {
      case 'owner_id':
        const owner = validationInfo.owners.find(o => o.id === value);
        return owner ? owner.email : value;
      case 'land_id':
        const land = validationInfo.lands.find(l => l.id === value);
        return land ? land.name : value;
      case 'status':
        const status = validationInfo.statuses.find(s => s.key === value);
        return status ? status.label_es : value;
      default:
        return value;
    }
  }

  private async showToast(message: string, color: 'success' | 'warning' | 'danger') {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    await toast.present();
  }

  onCancel() {
    this.router.navigate(['/animal/list']);
  }

  viewAnimalDetail(animalId: string) {
    this.router.navigate(['/animal', animalId]);
  }

  goToAnimalList() {
    this.router.navigate(['/animal/list']);
  }

  filterByStatus(status: string) {
    const filtered = this.allAnimals().filter(animal => animal.status === status);
    this.filteredAnimals.set(filtered);
    this.searchTerm.set(`estado:${status}`);
  }

  clearFilters() {
    this.filteredAnimals.set(this.allAnimals());
    this.searchTerm.set('');
  }

  getSelectedAnimalIdsArray(): string[] {
    return Array.from(this.selectedAnimalIds());
  }

  getAnimalById(animalId: string): Animal | undefined {
    return this.allAnimals().find(animal => animal.id === animalId);
  }
}
