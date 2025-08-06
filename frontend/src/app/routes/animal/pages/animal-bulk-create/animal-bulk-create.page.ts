import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  IonAlert,
  IonList,
  IonCheckbox,
  IonFab,
  IonFabButton,
  IonModal,
  IonDatetime,
  IonDatetimeButton,
  IonTextarea,
  LoadingController,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, trash, save, close, alertCircle, checkmarkCircle, flask, cloudUpload, copy } from 'ionicons/icons';

import { AnimalBulkService, BulkAnimalCreate, BulkOperationResult, BulkValidationInfo } from '../../../../services/animal-bulk.service';

@Component({
  selector: 'app-animal-bulk-create',
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
    IonAlert,
    IonList,
    IonCheckbox,
    IonFab,
    IonFabButton,
    IonModal,
    IonDatetime,
    IonDatetimeButton,
    IonTextarea
  ],
  templateUrl: './animal-bulk-create.page.html',
  styleUrls: ['./animal-bulk-create.page.scss']
})
export class AnimalBulkCreatePage implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private title = inject(Title);
  private animalBulkService = inject(AnimalBulkService);
  private loadingController = inject(LoadingController);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);

  // Form and state
  bulkForm!: FormGroup;
  loading = signal(false);
  validationInfo = signal<BulkValidationInfo | null>(null);
  
  // Progress tracking
  processingProgress = signal(0);
  
  // Results
  showResults = signal(false);
  lastResult = signal<BulkOperationResult | null>(null);

  // Form controls accessors
  get animalRows(): FormArray {
    return this.bulkForm.get('animals') as FormArray;
  }

  constructor() {
    addIcons({ add, trash, save, close, alertCircle, checkmarkCircle, flask, cloudUpload, copy });
  }

  ngOnInit() {
    this.title.setTitle('Crear Animales en Lote | Sistema de Trazabilidad');
    this.initializeForm();
    this.loadValidationInfo();
  }

  private initializeForm() {
    this.bulkForm = this.fb.group({
      animals: this.fb.array([
        this.createAnimalFormGroup(1),
        this.createAnimalFormGroup(2),
        this.createAnimalFormGroup(3)
      ])
    });
  }

  private createAnimalFormGroup(rowId: number): FormGroup {
    return this.fb.group({
      row_id: [rowId],
      breed: ['', [Validators.required, Validators.minLength(2)]],
      birth_date: ['', [Validators.required, this.validateBirthDate]],
      owner_id: ['', Validators.required],
      land_id: ['', Validators.required],
      status: ['alive', Validators.required]
    });
  }

  private validateBirthDate(control: any) {
    if (!control.value) return null;
    
    const selectedDate = new Date(control.value);
    const today = new Date();
    const thirtyYearsAgo = new Date();
    thirtyYearsAgo.setFullYear(today.getFullYear() - 30);
    
    if (selectedDate > today) {
      return { futureDate: true };
    }
    
    if (selectedDate < thirtyYearsAgo) {
      return { tooOldDate: true };
    }
    
    return null;
  }

  private async loadValidationInfo() {
    try {
      const info = await this.animalBulkService.getBulkValidationInfo();
      this.validationInfo.set(info);
    } catch (error) {
      console.error('Error loading validation info:', error);
      await this.showToast('Error cargando información de validación', 'danger');
    }
  }

  addRow() {
    const currentLength = this.animalRows.length;
    if (currentLength >= 50) {
      this.showToast('Máximo 50 animales por lote', 'warning');
      return;
    }
    
    const newRowId = currentLength + 1;
    this.animalRows.push(this.createAnimalFormGroup(newRowId));
  }

  removeRow(index: number) {
    if (this.animalRows.length <= 1) {
      this.showToast('Debe mantener al menos una fila', 'warning');
      return;
    }
    
    this.animalRows.removeAt(index);
    this.updateRowIds();
  }

  private updateRowIds() {
    this.animalRows.controls.forEach((control, index) => {
      control.patchValue({ row_id: index + 1 });
    });
  }

  duplicateRow(index: number) {
    const rowData = this.animalRows.at(index).value;
    const newRowId = this.animalRows.length + 1;
    const newRow = this.createAnimalFormGroup(newRowId);
    
    // Copy data except row_id
    newRow.patchValue({
      ...rowData,
      row_id: newRowId
    });
    
    this.animalRows.push(newRow);
  }

  async onSubmit() {
    if (this.bulkForm.invalid) {
      this.markAllFieldsAsTouched();
      await this.showToast('Por favor complete todos los campos requeridos', 'warning');
      return;
    }

    this.loading.set(true);
    this.processingProgress.set(0);
    
    const animals: BulkAnimalCreate[] = this.animalRows.value;
    const totalAnimals = animals.length;
    
    const loadingEl = await this.loadingController.create({
      message: `Creando ${totalAnimals} animales...`,
      spinner: 'crescent'
    });
    await loadingEl.present();

    // Simulate progress updates (since we don't have real-time feedback from backend)
    const progressInterval = setInterval(() => {
      const currentProgress = this.processingProgress();
      if (currentProgress < 90) {
        this.processingProgress.set(Math.min(currentProgress + 10, 90));
        loadingEl.message = `Procesando... ${this.processingProgress()}%`;
      }
    }, 500);

    try {
      const result = await this.animalBulkService.bulkCreateAnimals(animals);
      
      clearInterval(progressInterval);
      this.processingProgress.set(100);
      
      this.lastResult.set(result);
      this.showResults.set(true);
      
      if (result.success) {
        await this.showToast(`${result.successful} animales creados exitosamente`, 'success');
      } else {
        await this.showToast(
          `${result.successful} exitosos, ${result.failed} con errores`, 
          'warning'
        );
      }
    } catch (error: any) {
      clearInterval(progressInterval);
      console.error('Error creating animals:', error);
      await this.showToast('Error al crear animales: ' + (error.message || 'Error desconocido'), 'danger');
    } finally {
      this.loading.set(false);
      await loadingEl.dismiss();
      this.processingProgress.set(0);
    }
  }

  async clearForm() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Está seguro que desea limpiar el formulario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Limpiar',
          handler: () => {
            this.initializeForm();
            this.showResults.set(false);
            this.lastResult.set(null);
          }
        }
      ]
    });
    await alert.present();
  }

  private markAllFieldsAsTouched() {
    this.animalRows.controls.forEach(control => {
      control.markAllAsTouched();
    });
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

  getFieldError(rowIndex: number, fieldName: string): string {
    const control = this.animalRows.at(rowIndex)?.get(fieldName);
    if (control?.invalid && control?.touched) {
      if (control.errors?.['required']) {
        return 'Campo requerido';
      }
      if (control.errors?.['minlength']) {
        return 'Mínimo 2 caracteres';
      }
      if (control.errors?.['futureDate']) {
        return 'La fecha no puede ser en el futuro';
      }
      if (control.errors?.['tooOldDate']) {
        return 'La fecha es demasiado antigua (máximo 30 años)';
      }
    }
    return '';
  }

  isFieldInvalid(rowIndex: number, fieldName: string): boolean {
    const control = this.animalRows.at(rowIndex)?.get(fieldName);
    return !!(control?.invalid && control?.touched);
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

  fillSampleData() {
    const sampleData = {
      breed: 'Holstein',
      birth_date: '2023-01-15',
      owner_id: this.validationInfo()?.owners[0]?.id || '',
      land_id: this.validationInfo()?.lands[0]?.id || '',
      status: 'alive'
    };

    this.animalRows.controls.forEach((control, index) => {
      control.patchValue({
        ...sampleData,
        row_id: index + 1,
        birth_date: this.generateRandomBirthDate()
      });
    });

    this.showToast('Datos de ejemplo agregados', 'success');
  }

  private generateRandomBirthDate(): string {
    const startDate = new Date('2020-01-01');
    const endDate = new Date('2024-01-01');
    const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    return new Date(randomTime).toISOString().split('T')[0];
  }

  async importFromCSV() {
    const alert = await this.alertController.create({
      header: 'Importar CSV',
      message: `
        <p>Para importar datos desde CSV:</p>
        <ol>
          <li>Prepare un archivo CSV con columnas: breed,birth_date,owner_email,land_name,status</li>
          <li>Ejemplo: Holstein,2023-01-15,user@email.com,Predio Norte,alive</li>
          <li>Use el input de archivo que aparecerá abajo</li>
        </ol>
      `,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Continuar',
          handler: () => {
            this.showFileInput();
          }
        }
      ]
    });
    await alert.present();
  }

  private showFileInput() {
    // Create a hidden file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.style.display = 'none';
    
    fileInput.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        this.processCSVFile(target.files[0]);
      }
    });
    
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  }

  private async processCSVFile(file: File) {
    try {
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim());
      
      if (lines.length > 51) { // Header + 50 animals max
        await this.showToast('El archivo excede el límite de 50 animales', 'warning');
        return;
      }

      // Clear current form
      this.animalRows.clear();

      // Process each line
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim());
        const rowData: any = { row_id: i };

        values.forEach((value, index) => {
          const header = headers[index];
          switch (header) {
            case 'breed':
              rowData.breed = value;
              break;
            case 'birth_date':
              rowData.birth_date = value;
              break;
            case 'owner_email':
              const owner = this.validationInfo()?.owners.find(o => o.email === value);
              rowData.owner_id = owner?.id || '';
              break;
            case 'land_name':
              const land = this.validationInfo()?.lands.find(l => l.name === value);
              rowData.land_id = land?.id || '';
              break;
            case 'status':
              rowData.status = value;
              break;
          }
        });

        const newRow = this.createAnimalFormGroup(i);
        newRow.patchValue(rowData);
        this.animalRows.push(newRow);
      }

      await this.showToast(`${lines.length - 1} animales importados desde CSV`, 'success');
    } catch (error) {
      console.error('Error processing CSV:', error);
      await this.showToast('Error procesando el archivo CSV', 'danger');
    }
  }
}
