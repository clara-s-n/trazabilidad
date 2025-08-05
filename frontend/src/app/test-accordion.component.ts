import { Component } from '@angular/core';
import { AccordionMenuComponent } from './components/accordion-menu/accordion-menu.component';
import { MenuItem } from './model/components/menuItem';

@Component({
  selector: 'app-test-accordion',
  standalone: true,
  imports: [AccordionMenuComponent],
  template: `
    <div style="width: 300px; padding: 20px;">
      <h3>Test Accordion Menu</h3>
      <app-accordion-menu [items]="testItems"></app-accordion-menu>
    </div>
  `,
})
export class TestAccordionComponent {
  testItems: MenuItem[] = [
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Lista de animales', link: '/animal/list' },
    { label: 'Crear animal', link: '/animal/create' },
    { label: 'Lista de predios', link: '/land/list' },
    { label: 'Crear predio', link: '/land/create' },
    { label: 'Lista de usuarios', link: '/user/list' },
    { label: 'Crear usuario', link: '/user/create' },
    { label: 'Lista de caravanas', link: '/tag/list' },
    { label: 'Reportes', link: '/reports' },
    { label: 'Ayuda', link: '/help' },
  ];
}
