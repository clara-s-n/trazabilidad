import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
  output,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { WeighingCreate } from 'src/app/model/events/weighing';
@Component({
  selector: 'app-weighing-form',
  templateUrl: './weighing-form.component.html',
  styleUrls: ['./weighing-form.component.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonInput, IonButton, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-weighing-form' },
})
export class WeighingFormComponent {
  private fb = inject(FormBuilder);

  public id = input.required<string>();
  public submitted = output<WeighingCreate>();

  /** Formulario reactivo de pesaje */
  form = this.fb.group({
    weight: [0, [Validators.required, Validators.min(0)]],
    unit: ['kg'],
    comments: [''], // no required, y default a ''
  });

  // isValid = computed(() => this.form.valid);

  /** Emite el formulario con fecha generada automáticamente */
  onSubmit() {
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();

    const payload: WeighingCreate = {
      animal_id: this.id(),
      weight: raw.weight ?? 0,
      unit: raw.unit ?? '',
      date: new Date().toISOString(),
      comments: raw.comments || undefined,
    };

    this.submitted.emit(payload);
  }
}
