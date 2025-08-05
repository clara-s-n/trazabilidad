import { Component, input, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonIcon,
  IonLabel,
  IonList,
  IonMenuToggle,
} from '@ionic/angular/standalone';
import { MenuItem } from '../../model/components/menuItem';
import { addIcons } from 'ionicons';
import {
  chevronDownOutline,
  chevronForwardOutline,
  homeOutline,
  peopleOutline,
  listOutline,
  addCircleOutline,
  pricetagsOutline,
  mapOutline,
  analyticsOutline,
  helpCircleOutline,
} from 'ionicons/icons';

interface MenuSection {
  label: string;
  items: MenuItem[];
  color?: string;
  icon?: string;
}

@Component({
  selector: 'app-accordion-menu',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    IonAccordionGroup,
    IonAccordion,
    IonItem,
    IonIcon,
    IonLabel,
    IonList,
    IonMenuToggle,
  ],
  template: `
    <ion-list>
      <ion-accordion-group [multiple]="true">
        @for (section of sections(); track section.label) {
        <ion-accordion [value]="section.label">
          <!-- Header del acordeón -->
          <ion-item slot="header" [color]="section.color || 'light'">
            <ion-icon
              slot="start"
              [name]="section.icon || getSectionIcon(section.label)"
              color="primary"
            >
            </ion-icon>
            <ion-label>{{ section.label }}</ion-label>
          </ion-item>

          <!-- Items hijos -->
          @for (item of section.items; track item.link) {
          <ion-menu-toggle>
            <ion-item
              slot="content"
              button
              lines="full"
              [routerLink]="item.link"
              routerLinkActive="selected"
              detail="false"
              class="menu-item"
            >
              <ion-icon
                slot="start"
                [name]="getItemIcon(item.label)"
                color="medium"
              >
              </ion-icon>
              <ion-label>{{ item.label }}</ion-label>
            </ion-item>
          </ion-menu-toggle>
          }
        </ion-accordion>
        }
      </ion-accordion-group>
    </ion-list>
  `,
  styleUrls: ['./accordion-menu.component.scss'],
})
export class AccordionMenuComponent {
  items = input<MenuItem[]>([]);

  // Computed property to group items by section with colors and icons
  readonly sections = computed(() => {
    const items = this.items();
    const grouped = new Map<string, MenuItem[]>();

    items.forEach((item) => {
      const sectionName = this.getSectionFromPath(item.link);
      if (!grouped.has(sectionName)) {
        grouped.set(sectionName, []);
      }
      grouped.get(sectionName)!.push(item);
    });

    // Convert to array format with enhanced section data
    return Array.from(grouped.entries())
      .map(([label, items]) => ({
        label,
        items,
        color: this.getSectionColor(label),
        icon: this.getSectionIcon(label),
      }))
      .sort(
        (a, b) => this.getSectionOrder(a.label) - this.getSectionOrder(b.label)
      );
  });

  constructor() {
    addIcons({
      chevronDownOutline,
      chevronForwardOutline,
      homeOutline,
      peopleOutline,
      listOutline,
      addCircleOutline,
      pricetagsOutline,
      mapOutline,
      analyticsOutline,
      helpCircleOutline,
    });
  }

  private getSectionFromPath(path: string): string {
    // Extract section from path (e.g., '/animal/list' -> 'Animales')
    const segments = path.split('/').filter((s) => s);
    if (segments.length === 0) return 'Dashboard';

    const firstSegment = segments[0];

    // Map path segments to section names
    switch (firstSegment) {
      case 'animal':
        return 'Animales';
      case 'land':
        return 'Predios';
      case 'user':
        return 'Usuarios';
      case 'tag':
        return 'Caravanas';
      case 'auth':
        return 'Autenticación';
      case 'dashboard':
        return 'Dashboard';
      case 'reports':
        return 'Reportes';
      case 'help':
        return 'Ayuda';
      default:
        return 'Otros';
    }
  }

  private getSectionOrder(section: string): number {
    // Define section display order
    const order = [
      'Dashboard',
      'Animales',
      'Predios',
      'Caravanas',
      'Usuarios',
      'Reportes',
      'Ayuda',
      'Autenticación',
      'Otros',
    ];
    const index = order.indexOf(section);
    return index === -1 ? 999 : index;
  }

  getSectionIcon(section: string): string {
    switch (section) {
      case 'Animales':
        return 'list-outline';
      case 'Predios':
        return 'map-outline';
      case 'Usuarios':
        return 'people-outline';
      case 'Caravanas':
        return 'pricetags-outline';
      case 'Dashboard':
        return 'home-outline';
      case 'Reportes':
        return 'analytics-outline';
      case 'Ayuda':
        return 'help-circle-outline';
      case 'Autenticación':
        return 'people-outline';
      default:
        return 'chevron-forward-outline';
    }
  }

  getSectionColor(section: string): string {
    switch (section) {
      case 'Dashboard':
        return 'primary';
      case 'Animales':
        return 'success';
      case 'Predios':
        return 'secondary';
      case 'Usuarios':
        return 'tertiary';
      case 'Caravanas':
        return 'warning';
      case 'Reportes':
        return 'medium';
      case 'Ayuda':
        return 'light';
      case 'Autenticación':
        return 'dark';
      default:
        return 'light';
    }
  }

  getItemIcon(label: string): string {
    if (
      label.toLowerCase().includes('crear') ||
      label.toLowerCase().includes('nuevo')
    ) {
      return 'add-circle-outline';
    }
    if (
      label.toLowerCase().includes('lista') ||
      label.toLowerCase().includes('ver')
    ) {
      return 'list-outline';
    }
    if (
      label.toLowerCase().includes('perfil') ||
      label.toLowerCase().includes('usuario')
    ) {
      return 'people-outline';
    }
    return 'chevron-forward-outline';
  }
}
