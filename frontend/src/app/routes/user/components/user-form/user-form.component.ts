import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  signal,
  computed,
  inject,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { FieldErrorPipe } from 'src/app/pipes/field-error.pipe';
import { MainStoreService } from 'src/app/services/main-store.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  imports: [
    CommonModule,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    FieldErrorPipe,
    FormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-user-form' },
})
export default class UserFormComponent {
  //inputs
  user = input<any | null>(null);
  isEditMode = input<boolean>(false);

  //outputs
  submitted = output<any>();
  canceled = output<void>();

  private store = inject(MainStoreService);

  email = signal('');
  password = signal('');
  repeatPassword = signal('');
  role_id = signal<number | null>(null);

  touched = signal({
    email: false,
    password: false,
    repeatPassword: false,
    role: false,
  });

  loading = signal(false);

  constructor() {
    // Reactivar con un effect el cambio de usuario
    effect(() => {
      const u = this.user();
      if (u) {
        this.email.set(u.email ?? '');
        this.role_id.set(u.role_id ?? null);
        this.password.set(u.role_id ?? null);
      }
    });
  }

  allValues = computed(() => ({
    email: this.email(),
    password: this.password(),
    repeatPassword: this.repeatPassword(),
    role_id: this.role_id(),
  }));

  showRoleSelect = computed(
    () => !this.isEditMode() || (this.isEditMode() && this.store.isAdmin())
  );

  formValid = computed(() => {
    const v = this.allValues();
    return (
      !!v.email &&
      !!v.password &&
      (!!v.repeatPassword || this.isEditMode()) &&
      !!v.role_id
    );
  });

  onEmailChange(value: string | number | null | undefined) {
    this.email.set(typeof value === 'string' ? value : String(value ?? ''));
    this.touched.set({ ...this.touched(), email: true });
  }
  onPasswordChange(value: string | number | null | undefined) {
    this.password.set(typeof value === 'string' ? value : String(value ?? ''));
    this.touched.set({ ...this.touched(), password: true });
  }
  onRepeatPasswordChange(value: string | number | null | undefined) {
    this.repeatPassword.set(
      typeof value === 'string' ? value : String(value ?? '')
    );
    this.touched.set({ ...this.touched(), repeatPassword: true });
  }
  onRoleChange(value: number | string | null | undefined) {
    // Siempre casteamos a number si es string o null
    const roleValue = typeof value === 'number' ? value : Number(value ?? 0);
    this.role_id.set(roleValue);
    this.touched.set({ ...this.touched(), role: true });
  }

  async onSubmit() {
    if (!this.formValid()) return;
    this.loading.set(true);
    try {
      this.submitted.emit({
        email: this.email(),
        password: this.password(),
        ...(this.isEditMode() ? {} : { repeatPassword: this.repeatPassword() }),
        role_id: this.role_id()!,
      });
    } finally {
      this.loading.set(false);
    }
  }

  onCancel() {
    this.canceled.emit();
  }
}
