import { Injectable, signal } from '@angular/core';

export interface AnimalFilterState {
  species: string | null;
  region: string | null;
  fromDate: string | null;
  toDate: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AnimalFilterService {
  private filterState = signal<AnimalFilterState>({
    species: null,
    region: null,
    fromDate: null,
    toDate: null
  });

  // Expose read-only signal
  readonly filters = this.filterState.asReadonly();

  updateFilters(filters: Partial<AnimalFilterState>) {
    this.filterState.update(current => ({
      ...current,
      ...filters
    }));
  }

  clearFilters() {
    this.filterState.set({
      species: null,
      region: null,
      fromDate: null,
      toDate: null
    });
  }

  setFromQueryParams(queryParams: { [key: string]: any }) {
    this.filterState.set({
      species: queryParams['species'] || null,
      region: queryParams['region'] || null,
      fromDate: queryParams['from'] || null,
      toDate: queryParams['to'] || null
    });
  }

  toQueryParams(): { [key: string]: string } {
    const filters = this.filterState();
    const params: { [key: string]: string } = {};
    
    if (filters.species) params['species'] = filters.species;
    if (filters.region) params['region'] = filters.region;
    if (filters.fromDate) params['from'] = filters.fromDate;
    if (filters.toDate) params['to'] = filters.toDate;
    
    return params;
  }

  hasActiveFilters(): boolean {
    const filters = this.filterState();
    return !!(filters.species || filters.region || filters.fromDate || filters.toDate);
  }
}
