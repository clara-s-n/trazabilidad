import { Pipe, PipeTransform, inject } from '@angular/core';
import { RolePermissionService } from '../services/role-permission.service';

@Pipe({
  name: 'hasPermission',
  standalone: true,
  pure: false // Make it impure so it reacts to role changes
})
export class HasPermissionPipe implements PipeTransform {
  private rolePermissionService = inject(RolePermissionService);

  transform(permission: string): boolean {
    const permissions = this.rolePermissionService.permissions();
    
    switch (permission) {
      case 'viewAnimals': return permissions.canViewAnimals;
      case 'createAnimals': return permissions.canCreateAnimals;
      case 'editAnimals': return permissions.canEditAnimals;
      case 'deleteAnimals': return permissions.canDeleteAnimals;
      case 'viewLands': return permissions.canViewLands;
      case 'createLands': return permissions.canCreateLands;
      case 'editLands': return permissions.canEditLands;
      case 'deleteLands': return permissions.canDeleteLands;
      case 'viewUsers': return permissions.canViewUsers;
      case 'createUsers': return permissions.canCreateUsers;
      case 'editUsers': return permissions.canEditUsers;
      case 'deleteUsers': return permissions.canDeleteUsers;
      case 'viewTags': return permissions.canViewTags;
      case 'createTags': return permissions.canCreateTags;
      case 'editTags': return permissions.canEditTags;
      case 'deleteTags': return permissions.canDeleteTags;
      case 'viewReports': return permissions.canViewReports;
      case 'manageEvents': return permissions.canManageEvents;
      default: return false;
    }
  }
}
