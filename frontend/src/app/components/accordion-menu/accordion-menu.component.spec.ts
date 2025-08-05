import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AccordionMenuComponent } from './accordion-menu.component';
import { MenuItem } from '../../model/components/menuItem';

describe('AccordionMenuComponent', () => {
  let component: AccordionMenuComponent;
  let fixture: ComponentFixture<AccordionMenuComponent>;

  const mockMenuItems: MenuItem[] = [
    { label: 'Lista de animales', link: '/animal/list' },
    { label: 'Crear animal', link: '/animal/create' },
    { label: 'Lista de predios', link: '/land/list' },
    { label: 'Crear predio', link: '/land/create' },
    { label: 'Lista de usuarios', link: '/user/list' },
    { label: 'Dashboard', link: '/dashboard' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionMenuComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionMenuComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should group menu items by section', () => {
    // Set input
    fixture.componentRef.setInput('items', mockMenuItems);
    fixture.detectChanges();

    const groupedItems = component.groupedItems();
    
    // Should have multiple sections
    expect(groupedItems.length).toBeGreaterThan(1);
    
    // Should have Animales section
    const animalesSection = groupedItems.find(section => section.label === 'Animales');
    expect(animalesSection).toBeTruthy();
    expect(animalesSection?.items.length).toBe(2);
    
    // Should have Predios section
    const prediosSection = groupedItems.find(section => section.label === 'Predios');
    expect(prediosSection).toBeTruthy();
    expect(prediosSection?.items.length).toBe(2);
  });

  it('should return correct section icons', () => {
    expect(component.getSectionIcon('Animales')).toBe('list-outline');
    expect(component.getSectionIcon('Predios')).toBe('map-outline');
    expect(component.getSectionIcon('Usuarios')).toBe('people-outline');
    expect(component.getSectionIcon('Dashboard')).toBe('home-outline');
  });

  it('should return correct item icons', () => {
    expect(component.getItemIcon('Crear animal')).toBe('add-circle-outline');
    expect(component.getItemIcon('Lista de animales')).toBe('list-outline');
    expect(component.getItemIcon('Perfil de usuario')).toBe('people-outline');
  });

  it('should render accordion structure', () => {
    fixture.componentRef.setInput('items', mockMenuItems);
    fixture.detectChanges();

    const accordionGroup = fixture.nativeElement.querySelector('ion-accordion-group');
    expect(accordionGroup).toBeTruthy();

    const accordions = fixture.nativeElement.querySelectorAll('ion-accordion');
    expect(accordions.length).toBeGreaterThan(0);
  });
});