// sale-form.component.ts
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
import { SaleCreate } from 'src/app/model/events/sale';

/**
 * Componente de formulario para crear venta
 */
@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  standalone: true,
  styleUrls: ['./sale-form.component.scss'],
  imports: [IonGrid, IonRow, IonCol, IonInput, IonButton, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-sale-form' },
})
export default class SaleFormComponent {
  private fb = inject(FormBuilder);

  public id = input.required<string>();
  public submitted = output<SaleCreate>();

  /** Formulario reactivo de venta */
  form = this.fb.group({
    buyer: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    currency: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(4)],
    ],
    comments: [''], // no required, y default a ''
  });

  // isValid = computed(() => this.form.valid);

  /** Emite el formulario con fecha generada automáticamente */
  onSubmit() {
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();

    const payload: SaleCreate = {
      animal_id: this.id(),
      buyer: raw.buyer ?? '',
      price: raw.price ?? 0,
      currency: raw.currency ?? '',
      date: new Date().toISOString(),
      comments: raw.comments || undefined,
    };

    this.submitted.emit(payload);
  }
}
