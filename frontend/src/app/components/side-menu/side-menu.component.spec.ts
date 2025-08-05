import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SideMenuComponent } from './side-menu.component';
import { AuthService } from '../../services/auth.service';
import { MainStoreService } from '../../services/main-store.service';

describe('SideMenuComponent', () => {
  let component: SideMenuComponent;
  let fixture: ComponentFixture<SideMenuComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockMainStore: jasmine.SpyObj<MainStoreService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAdmin', 'isOperatorOrAdmin', 'logout']);
    const mainStoreSpy = jasmine.createSpyObj('MainStoreService', [], {
      userEmail: jasmine.createSpy().and.returnValue('test@example.com'),
      userId: jasmine.createSpy().and.returnValue('123'),
      userRoleId: jasmine.createSpy().and.returnValue(1)
    });

    await TestBed.configureTestingModule({
      imports: [SideMenuComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MainStoreService, useValue: mainStoreSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SideMenuComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockMainStore = TestBed.inject(MainStoreService) as jasmine.SpyObj<MainStoreService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user role correctly', () => {
    expect(component.getRoleDisplayName()).toBe('Operador');
  });

  it('should show appropriate menu items for operator role', () => {
    mockAuthService.isOperatorOrAdmin.and.returnValue(true);
    mockAuthService.isAdmin.and.returnValue(false);

    const menuItems = component.menuItems();
    
    // Should include create items for operators
    expect(menuItems.some(item => item.label === 'Crear animal')).toBeTruthy();
    expect(menuItems.some(item => item.label === 'Crear predio')).toBeTruthy();
    
    // Should not include user management for operators
    expect(menuItems.some(item => item.label === 'Lista de usuarios')).toBeFalsy();
  });

  it('should show admin-only items for admin role', () => {
    mockAuthService.isOperatorOrAdmin.and.returnValue(true);
    mockAuthService.isAdmin.and.returnValue(true);

    const menuItems = component.menuItems();
    
    // Should include user management for admins
    expect(menuItems.some(item => item.label === 'Lista de usuarios')).toBeTruthy();
  });

  it('should call logout when logout button is clicked', () => {
    component.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });
});