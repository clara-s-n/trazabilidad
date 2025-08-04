import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { VaccinationCreate } from 'src/app/model/events/vaccination';

@Component({
  selector: 'app-vaccination-form',
  templateUrl: './vaccination-form.component.html',
  styleUrls: ['./vaccination-form.component.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonInput, IonButton, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-vaccination-form' },
})
export class VaccinationFormComponent {
  private fb = inject(FormBuilder);

  public id = input.required<string>();
  public submitted = output<VaccinationCreate>();
  /** Formulario reactivo de vacunación */
  form = this.fb.group({
    vaccine: ['', [Validators.required, Validators.minLength(3)]],
    dosage: ['', [Validators.required, Validators.minLength(3)]],
    provider: ['', [Validators.required, Validators.minLength(3)]],
    comments: [''], // no required, y default a ''
  });

  // isValid = computed(() => this.form.valid);

  /** Emite el formulario con fecha generada automáticamente */
  onSubmit() {
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();

    const payload: VaccinationCreate = {
      animal_id: this.id(),
      vaccine: raw.vaccine ?? '',
      dosage: raw.dosage ?? '',
      provider: raw.provider ?? '',
      date: new Date().toISOString(),
      comments: raw.comments || undefined,
    };

    this.submitted.emit(payload);
  }
}
