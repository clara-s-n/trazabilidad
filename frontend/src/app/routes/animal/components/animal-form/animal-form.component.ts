import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonDatetime,
  IonDatetimeButton,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from '@ionic/angular/standalone';
import { Animal, AnimalPost } from 'src/app/model/animal';

@Component({
  selector: 'app-animal-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
  ],
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss'],
})
export class AnimalFormComponent implements OnInit {
  @Input() isEditMode = false;
  @Input() animal: Animal | null = null;
  @Output() submitted = new EventEmitter<AnimalPost>();
  @Output() canceled = new EventEmitter<void>();

  private fb = inject(FormBuilder);

  animalForm!: FormGroup;
  loading = signal(false);

  // Mock data - replace with actual service calls
  breeds = ['Holstein', 'Jersey', 'Angus', 'Hereford', 'Charolais'];
  statuses = ['Activo', 'Vendido', 'Muerto', 'Transferido'];

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.animalForm = this.fb.group({
      breed: [this.animal?.breed || '', [Validators.required]],
      birth_date: [this.animal?.birth_date || '', [Validators.required]],
      owner_id: [this.animal?.owner_id || '', [Validators.required]],
      land_id: [this.animal?.land_id || '', [Validators.required]],
      status: [this.animal?.status || 'Activo', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.animalForm.valid) {
      this.loading.set(true);
      try {
        const formData = this.animalForm.value;
        this.submitted.emit(formData);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        this.loading.set(false);
      }
    } else {
      // Mark all fields as touched to show validation errors
      this.animalForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.canceled.emit();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.animalForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.animalForm.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName} es requerido`;
      }
    }
    return '';
  }
}
