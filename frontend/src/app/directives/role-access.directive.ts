import { Directive, Input, TemplateRef, ViewContainerRef, inject, OnInit, OnDestroy, effect } from '@angular/core';
import { MainStoreService } from '../services/main-store.service';

@Directive({
  selector: '[appRoleAccess]',
  standalone: true
})
export class RoleAccessDirective implements OnInit, OnDestroy {
  private templateRef = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private mainStore = inject(MainStoreService);
  
  private allowedRoles: number[] = [];
  private roleEffect?: any;
  
  // Accept either a single role or array of roles
  @Input() set appRoleAccess(allowedRoles: number | number[]) {
    this.allowedRoles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    this.updateView();
  }
  
  ngOnInit() {
    // Create reactive effect to watch role changes
    this.roleEffect = effect(() => {
      // Listen to role changes
      this.mainStore.userRoleId();
      this.updateView();
    });
  }
  
  ngOnDestroy() {
    // Clean up effect
    if (this.roleEffect) {
      this.roleEffect.destroy();
    }
  }
  
  private updateView() {
    const userRoleId = this.mainStore.userRoleId();
    
    // Clear view if no role
    if (!userRoleId) {
      this.viewContainer.clear();
      return;
    }
    
    // Display content if role matches or roles array is empty (allow all)
    if (this.allowedRoles.length === 0 || this.allowedRoles.includes(userRoleId)) {
      if (this.viewContainer.length === 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    } else {
      this.viewContainer.clear();
    }
  }
}
