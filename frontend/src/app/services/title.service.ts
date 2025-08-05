import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private title = inject(Title);
  private router = inject(Router);

  constructor() {
    // Listen to route changes and update title automatically
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.router.routerState.root),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        map((route) => route.snapshot.data['title'])
      )
      .subscribe((title) => {
        if (title) {
          this.setTitle(title);
        }
      });
  }

  setTitle(title: string): void {
    this.title.setTitle(`${title} | Sistema de Trazabilidad`);
  }

  setTitleFromRoute(route: ActivatedRoute): void {
    const routeTitle = route.snapshot.data['title'];
    if (routeTitle) {
      this.setTitle(routeTitle);
    }
  }

  getTitle(): string {
    return this.title.getTitle();
  }
}
