// validate-user-form.directive.ts
import { Directive, Input, forwardRef } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator
} from '@angular/forms';

@Directive({
  selector: '[validateUserForm]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => ValidateUserFormDirective),
    multi: true
  }]
})
export class ValidateUserFormDirective implements Validator {
  /** Roles permitidos para el select */
  @Input('allowedRoles') allowedRoles: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    const errors: ValidationErrors = {};

    // 1) Email
    const emailCtrl = control.get('email');
    if (emailCtrl) {
      const email = emailCtrl.value as string;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors['emailFormat'] = 'Formato de email inválido';
      }
    }

    // 2) Contraseña (si no está vacía, mínimo 6)
    const passCtrl = control.get('password');
    if (passCtrl) {
      const pwd = passCtrl.value as string;
      if (pwd && pwd.length < 6) {
        errors['passwordFormat'] = 'La contraseña debe tener al menos 6 caracteres';
      }
    }

    // 3) Roles válidos
    const rolesCtrl = control.get('roles');
    if (rolesCtrl) {
      const roles = rolesCtrl.value as string[];
      const invalid = (roles || []).filter(r => !this.allowedRoles.includes(r));
      if (invalid.length > 0) {
        errors['invalidRoles'] = { invalid };
      }
    }

    return Object.keys(errors).length ? errors : null;
  }
}
