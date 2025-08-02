import { Pipe, PipeTransform } from '@angular/core';
import { emailValidator } from '../validators/email-validator';
import { passwordValidator } from '../validators/password-validator';
import { repeatPasswordValidator } from '../validators/repeat-password-validator';
import { rolesValidator } from '../validators/role-validator';

@Pipe({ name: 'fieldError', standalone: true })
export class FieldErrorPipe implements PipeTransform {
  transform(
    field: string,
    value: any,
    allValues: any,
    touched: boolean
  ): string | null {
    if (!touched) return null;

    switch (field) {
      case 'email':
        if (!emailValidator(value)) return 'Email inválido';
        break;
      case 'password':
        if (!passwordValidator(value)) return 'Contraseña inválida. Mínimo 6 caracteres, letras y números.';
        break;
      case 'repeatPassword':
        if (!repeatPasswordValidator(allValues.password, value)) return 'Las contraseñas no coinciden';
        break;
      case 'role_id':
        if (!rolesValidator([value])) return 'Selecciona un rol válido';
        break;
    }
    return null;
  }
}
