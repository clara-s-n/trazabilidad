import { inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * Simple helper function to set page titles consistently
 * Use this in ngOnInit() of components
 */
export function setPageTitle(title: string): void {
  const titleService = inject(Title);
  titleService.setTitle(`${title} | Sistema de Trazabilidad`);
}

/**
 * Utility function to be used in component classes
 * Returns a function that can be called to set the title
 */
export function createTitleSetter() {
  const titleService = inject(Title);
  return (title: string) => {
    titleService.setTitle(`${title} | Sistema de Trazabilidad`);
  };
}
