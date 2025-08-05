import { Injectable, inject, computed } from '@angular/core';
import { MainStoreService } from './main-store.service';

export interface RolePermissions {
  canViewAnimals: boolean;
  canCreateAnimals: boolean;
  canEditAnimals: boolean;
  canDeleteAnimals: boolean;
  canViewLands: boolean;
  canCreateLands: boolean;
  canEditLands: boolean;
  canDeleteLands: boolean;
  canViewUsers: boolean;
  canCreateUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canViewTags: boolean;
  canCreateTags: boolean;
  canEditTags: boolean;
  canDeleteTags: boolean;
  canViewReports: boolean;
  canManageEvents: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class RolePermissionService {
  private mainStore = inject(MainStoreService);

  // Role constants
  readonly ROLE_OPERATOR = 1;
  readonly ROLE_CONSULTA = 2;
  readonly ROLE_ADMIN = 3;

  // Computed role checks
  readonly isAdmin = computed(() => this.mainStore.userRoleId() === this.ROLE_ADMIN);
  readonly isOperator = computed(() => this.mainStore.userRoleId() === this.ROLE_OPERATOR);
  readonly isConsulta = computed(() => this.mainStore.userRoleId() === this.ROLE_CONSULTA);
  readonly isOperatorOrAdmin = computed(() => this.isOperator() || this.isAdmin());

  // Computed permissions based on role
  readonly permissions = computed((): RolePermissions => {
    const role = this.mainStore.userRoleId();
    
    switch (role) {
      case this.ROLE_ADMIN: // Administrator
        return {
          canViewAnimals: true,
          canCreateAnimals: true,
          canEditAnimals: true,
          canDeleteAnimals: true,
          canViewLands: true,
          canCreateLands: true,
          canEditLands: true,
          canDeleteLands: true,
          canViewUsers: true,
          canCreateUsers: true,
          canEditUsers: true,
          canDeleteUsers: true,
          canViewTags: true,
          canCreateTags: true,
          canEditTags: true,
          canDeleteTags: true,
          canViewReports: true,
          canManageEvents: true,
        };
        
      case this.ROLE_OPERATOR: // Operator
        return {
          canViewAnimals: true,
          canCreateAnimals: true,
          canEditAnimals: true,
          canDeleteAnimals: false,
          canViewLands: true,
          canCreateLands: true,
          canEditLands: true,
          canDeleteLands: false,
          canViewUsers: false,
          canCreateUsers: false,
          canEditUsers: false,
          canDeleteUsers: false,
          canViewTags: true,
          canCreateTags: true,
          canEditTags: true,
          canDeleteTags: false,
          canViewReports: true,
          canManageEvents: true,
        };
        
      case this.ROLE_CONSULTA: // Read-only
        return {
          canViewAnimals: true,
          canCreateAnimals: false,
          canEditAnimals: false,
          canDeleteAnimals: false,
          canViewLands: true,
          canCreateLands: false,
          canEditLands: false,
          canDeleteLands: false,
          canViewUsers: false,
          canCreateUsers: false,
          canEditUsers: false,
          canDeleteUsers: false,
          canViewTags: false,
          canCreateTags: false,
          canEditTags: false,
          canDeleteTags: false,
          canViewReports: true,
          canManageEvents: false,
        };
        
      default: // No role or unknown role
        return {
          canViewAnimals: false,
          canCreateAnimals: false,
          canEditAnimals: false,
          canDeleteAnimals: false,
          canViewLands: false,
          canCreateLands: false,
          canEditLands: false,
          canDeleteLands: false,
          canViewUsers: false,
          canCreateUsers: false,
          canEditUsers: false,
          canDeleteUsers: false,
          canViewTags: false,
          canCreateTags: false,
          canEditTags: false,
          canDeleteTags: false,
          canViewReports: false,
          canManageEvents: false,
        };
    }
  });

  // Helper methods for common permission checks
  canAccess(requiredRoles: number[]): boolean {
    const userRole = this.mainStore.userRoleId();
    return userRole !== null && requiredRoles.includes(userRole);
  }

  getRoleName(): string {
    const role = this.mainStore.userRoleId();
    switch (role) {
      case this.ROLE_ADMIN: return 'Administrador';
      case this.ROLE_OPERATOR: return 'Operador';
      case this.ROLE_CONSULTA: return 'Consulta';
      default: return 'Sin rol';
    }
  }

  // Check specific permissions
  canViewSection(section: 'animals' | 'lands' | 'users' | 'tags' | 'reports'): boolean {
    const perms = this.permissions();
    switch (section) {
      case 'animals': return perms.canViewAnimals;
      case 'lands': return perms.canViewLands;
      case 'users': return perms.canViewUsers;
      case 'tags': return perms.canViewTags;
      case 'reports': return perms.canViewReports;
      default: return false;
    }
  }

  canEditSection(section: 'animals' | 'lands' | 'users' | 'tags'): boolean {
    const perms = this.permissions();
    switch (section) {
      case 'animals': return perms.canEditAnimals;
      case 'lands': return perms.canEditLands;
      case 'users': return perms.canEditUsers;
      case 'tags': return perms.canEditTags;
      default: return false;
    }
  }
}
