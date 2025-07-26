import { Component, inject, OnInit } from '@angular/core';
import { Router, Route, RouterLink } from '@angular/router';
import { MainStoreService } from 'src/app/services/main-store.service';
import { MenuSection } from 'src/app/model/components/menuSection';
import { CommonModule } from '@angular/common';
import { IonAccordion, IonAccordionGroup, IonButtons, IonContent, IonHeader, IonItem, IonItemDivider, IonLabel, IonList, IonMenu, IonMenuButton, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MenuRouteData } from 'src/app/model/components/menuRouteData';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    IonButtons,
    IonMenuButton,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonRouterOutlet,
    IonAccordionGroup,
    IonAccordion,
    IonLabel,
    IonItemDivider,
    RouterLink
],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  public sections: MenuSection[] = [];
  private router = inject(Router)
  private mainStoreService = inject(MainStoreService)

  ngOnInit() {
    // 1) Tomamos las rutas hijas del root ('')
    const rootConfig = this.router.config.find(r => r.path === '');
    const childRoutes = rootConfig?.children ?? [];

    // 2) Filtramos solo las que tienen data.menu = true y no llevan ':'
    const menuRoutes = childRoutes.filter((r): r is Route & { data: MenuRouteData } => {
      const data = r.data as MenuRouteData;
      return data?.['menu'] === true && !r.path?.includes(':');
    });
    console.log('Rutas con menú:', menuRoutes);

    // 3) Agrupamos por sección
    const grouped = menuRoutes.reduce((acc, r) => {
      const data = r.data as MenuRouteData;
      const section = data['section']!;
      const title   = data['title']!;
      const link    = `/${r.path}`;

      if (!acc[section]) {
        acc[section] = { label: section , items: [] };
      }
      acc[section].items.push({ label: title, link });
      return acc;
    }, {} as Record<string, MenuSection>);

    // 4) Convertimos el objeto agrupado en un array
    this.sections = Object.values(grouped);
  }

  logout() {
    this.mainStoreService.clearAuth();
  }
}