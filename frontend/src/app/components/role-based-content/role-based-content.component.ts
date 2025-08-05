import { Component, Input, inject, computed, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolePermissionService } from 'src/app/services/role-permission.service';

@Component({
  selector: 'app-role-based-content',
  template: `
    <ng-container *ngIf="hasPermission()">
      <ng-content></ng-content>
    </ng-container>
    
    <ng-container *ngIf="!hasPermission() && showFallback">
      <ng-content select="[slot=fallback]"></ng-content>
    </ng-container>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class RoleBasedContentComponent {
  @Input() requiredRoles: number[] = [];
  @Input() requiredPermission?: string;
  @Input() showFallback = false;
  
  private rolePermissionService = inject(RolePermissionService);
  
  readonly hasPermission = computed(() => {
    if (this.requiredPermission) {
      const permissions = this.rolePermissionService.permissions();
      return this.checkPermission(this.requiredPermission, permissions);
    }
    
    if (this.requiredRoles.length > 0) {
      return this.rolePermissionService.canAccess(this.requiredRoles);
    }
    
    return true; // No restrictions
  });
  
  private checkPermission(permission: string, permissions: any): boolean {
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
