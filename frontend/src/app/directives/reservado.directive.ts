import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appReservado]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ReservadoDirective,
      multi: true,
    }
  ]
})
export class ReservadoDirective implements Validator {
  
  public razaReservada = input<string>('', {alias: 'appReservado'});

  validate(control: AbstractControl): ValidationErrors | null {
    return this.razaReservada() != control.value ? null : {appReservado: true}
  }
}
