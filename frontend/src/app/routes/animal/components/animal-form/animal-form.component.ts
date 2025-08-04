import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainStoreService } from 'src/app/services/main-store.service';

@Component({
  selector: 'app-animal-form',
  templateUrl: './animal-form.component.html',
  styleUrls: ['./animal-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-animal-form' },
})
export class AnimalFormComponent {
  //inputs
  animal = input<any | null>(null);
  isEditMode = input<boolean>(false);

  private store = inject(MainStoreService);

  //outputs
  submitted = output<any>();
  canceled = output<void>();

  breed = signal('');
  birth_date = signal('');
  owner_id = signal('');
  land_id = signal('');
  status = signal('');

  touched = signal({
    breed: false,
    birth_date: false,
    owner_id: false,
    land_id: false,
    status: false,
  });

  loading = signal(false);

  constructor() {
    // Reactivar con un effect el cambio de animal
    effect(() => {
      const a = this.animal();
      if (a) {
        this.breed.set(a.breed);
        this.birth_date.set(a.birth_date);
        this.owner_id.set(a.owner_id);
        this.land_id.set(a.land_id);
        this.status.set(a.status);
      }
    });
  }

  allValues = computed(() => ({
    breed: this.breed(),
    birth_date: this.birth_date(),
    owner_id: this.owner_id(),
    land_id: this.land_id(),
    status: this.status(),
  }));

  showStatusSelect = computed(
    () =>
      !this.isEditMode() ||
      (this.isEditMode() && this.store.isOperatorOrAdmin())
  );

  formValid = computed(() => {
    const v = this.allValues();
    return (
      !!v.breed && !!v.birth_date && !!v.land_id && !!v.owner_id && !!v.status
    );
  });

  onBreedChange(value: string | number | null | undefined) {
    this.breed.set(typeof value === 'string' ? value : String(value ?? ''));
    this.touched.set({ ...this.touched(), breed: true });
  }
  onBirthDateChange(value: string | number | null | undefined) {
    this.birth_date.set(
      typeof value === 'string' ? value : String(value ?? '')
    );
    this.touched.set({ ...this.touched(), birth_date: true });
  }
  onLandIdChange(value: string | number | null | undefined) {
    this.land_id.set(typeof value === 'string' ? value : String(value ?? ''));
    this.touched.set({ ...this.touched(), land_id: true });
  }
  onOwnerIdChange(value: number | string | null | undefined) {
    this.owner_id.set(typeof value === 'string' ? value : String(value ?? ''));
    this.touched.set({ ...this.touched(), owner_id: true });
  }
  onStatusChange(value: number | string | null | undefined) {
    const statusValue = typeof value === 'string' ? value : String(value ?? '');
    this.status.set(statusValue);
    this.touched.set({ ...this.touched(), status: true });
  }

  async onSubmit() {
    if (!this.formValid()) return;
    this.loading.set(true);
    try {
      this.submitted.emit({
        breed: this.breed(),
        birth_date: this.birth_date(),
        land_id: this.land_id(),
        owner_id: this.owner_id(),
        status: this.status()!,
      });
    } finally {
      this.loading.set(false);
    }
  }

  onCancel() {
    this.canceled.emit();
  }
}
