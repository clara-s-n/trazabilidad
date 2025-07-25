import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {

  transform(errors: ValidationErrors|null, ...args: string[]): string {
    console.log({args})
    if(!errors) return '';
    if(errors["required"]) return 'Requerido mano';
    if(errors["appReservado"]) return 'El campo' + args[0] + 'es requerido mano.';
    if(errors["minLenghth"]) return 'Requerido mano';
    return 'error desconocido';
  }
}
