import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formError', standalone: true })
/*
 * Pipe que recibe un estado de validación y devuelve un string de error.
 */
export class FormErrorPipe implements PipeTransform {
  transform(invalid: boolean, touched: boolean, mensaje: string): string | null {
    return invalid && touched ? mensaje : null;
  }
}