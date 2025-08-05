import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { inject } from '@angular/core';
import { RolePermissionService } from '../services/role-permission.service';

export class RoleBasedValidators {
  
  static requirePermission(permission: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Since we can't inject in static methods, we'll need to handle this differently
      // This is more of a template for future implementation
      return null;
    };
  }

  static requireRole(requiredRoles: number[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // This would need to be implemented with a different pattern
      // Perhaps using a factory function that takes the service as parameter
      return null;
    };
  }
}

// Factory function approach for role-based validation
export function createRoleValidator(rolePermissionService: RolePermissionService, requiredRoles: number[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!rolePermissionService.canAccess(requiredRoles)) {
      return { 
        rolePermissionDenied: { 
          requiredRoles, 
          userRole: rolePermissionService.isAdmin() ? 3 : rolePermissionService.isOperator() ? 1 : 2
        } 
      };
    }
    return null;
  };
}

export function createPermissionValidator(rolePermissionService: RolePermissionService, permission: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const permissions = rolePermissionService.permissions();
    const hasPermission = checkPermissionForValidator(permission, permissions);
    
    if (!hasPermission) {
      return { 
        permissionDenied: { 
          requiredPermission: permission,
          userRole: rolePermissionService.isAdmin() ? 3 : rolePermissionService.isOperator() ? 1 : 2
        } 
      };
    }
    return null;
  };
}

function checkPermissionForValidator(permission: string, permissions: any): boolean {
  switch (permission) {
    case 'createAnimals': return permissions.canCreateAnimals;
    case 'editAnimals': return permissions.canEditAnimals;
    case 'createLands': return permissions.canCreateLands;
    case 'editLands': return permissions.canEditLands;
    case 'createUsers': return permissions.canCreateUsers;
    case 'editUsers': return permissions.canEditUsers;
    case 'createTags': return permissions.canCreateTags;
    case 'editTags': return permissions.canEditTags;
    default: return false;
  }
}
