import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  signal,
  computed,
  resource,
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
  IonSpinner,
  IonTextarea,
} from '@ionic/angular/standalone';
import { firstValueFrom } from 'rxjs';
import { Animal, AnimalPost } from 'src/app/model/animal';
import { UserService } from 'src/app/services/user.service';
import { LandsService } from 'src/app/services/lands.service';
import { AnimalService } from 'src/app/services/animal.service';

interface AnimalStatus {
  key: string;
  label_es: string;
  label_en: string;
}

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
    IonSpinner,
  ],
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss'],
})
export class AnimalFormComponent implements OnInit {
  @Input() isEditMode = false;
  @Input() animal: Animal | null | undefined = null;
  @Output() submitted = new EventEmitter<AnimalPost>();
  @Output() canceled = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private landsService = inject(LandsService);
  private animalService = inject(AnimalService);

  animalForm!: FormGroup;
  loading = signal(false);

  // Define resources for fetching data
  readonly usersResource = resource({
    loader: async () => await this.userService.getAllUsers(),
  });

  readonly landsResource = resource({
    loader: async () => await this.landsService.getAllLands(),
  });

  readonly statusesResource = resource<AnimalStatus[], undefined>({
    loader: async () => {
      return await this.animalService.getAnimalStatuses();
    },
  });

  // Legacy breed options in case needed as fallback
  breeds = ['Holstein', 'Jersey', 'Angus', 'Hereford', 'Charolais'];

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.animalForm = this.fb.group({
      breed: [this.animal?.breed || '', [Validators.required]],
      birth_date: [this.animal?.birth_date || '', [Validators.required]],
      owner_id: [this.animal?.owner_id || '', [Validators.required]],
      land_id: [this.animal?.land_id || '', [Validators.required]],
      status: [this.animal?.status || '', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.animalForm.valid) {
      this.loading.set(true);
      try {
        const formData = { ...this.animalForm.value };

        // Format birth_date to YYYY-MM-DD format
        if (formData.birth_date) {
          // Handle different date input formats
          const date = new Date(formData.birth_date);
          if (!isNaN(date.getTime())) {
            formData.birth_date = date.toISOString().split('T')[0]; // YYYY-MM-DD format
          }
        }

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