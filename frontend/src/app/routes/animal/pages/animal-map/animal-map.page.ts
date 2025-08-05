import { Component, computed, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonBadge,
  IonContent,
  IonSpinner,
  IonFab,
  IonFabButton,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  listOutline,
  addOutline,
  mapOutline,
  filterOutline,
  pawOutline,
} from 'ionicons/icons';

import { AnimalService } from '../../../../services/animal.service';
import { Animal } from '../../../../model/animal';
import {
  AnimalFiltersComponent,
  FilterValues,
} from '../../components/animal-filters/animal-filters.component';
import { RolePermissionService } from '../../../../services/role-permission.service';

@Component({
  selector: 'app-animal-map',
  templateUrl: './animal-map.page.html',
  styleUrls: ['./animal-map.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonTitle,
    IonBadge,
    IonContent,
    IonSpinner,
    IonFab,
    IonFabButton,
    AnimalFiltersComponent,
  ],
})
export class AnimalMapPage implements OnInit {
  private animalService = inject(AnimalService);
  private rolePermissionService = inject(RolePermissionService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Signals for state management
  loading = signal(true);
  animals = signal<Animal[]>([]);
  speciesList = signal<string[]>([]);
  regionsList = signal<string[]>([]);

  // Filter signals
  speciesFilter = signal<string | null>(null);
  regionFilter = signal<string | null>(null);
  fromDate = signal<string | null>(null);
  toDate = signal<string | null>(null);

  // Computed filtered animals
  filteredAnimals = computed(() => {
    const animals = this.animals();
    const species = this.speciesFilter();
    const region = this.regionFilter();
    const from = this.fromDate();
    const to = this.toDate();

    return animals.filter((animal) => {
      // Apply species filter if selected (using breed field)
      if (species && animal.breed !== species) {
        return false;
      }

      // Apply region filter if selected
      // TODO: Implement region filtering when land data is available in animals
      if (region) {
        // For now, region filter doesn't apply since we don't have region data in animals
        // This will be implemented when we have access to animal's current land location
      }

      // Apply date range filter if selected
      if (from && to) {
        const animalDate = new Date(animal.birth_date);
        const fromDate = new Date(from);
        const toDate = new Date(to);

        if (animalDate < fromDate || animalDate > toDate) {
          return false;
        }
      }

      return true;
    });
  });

  // Permission computed properties
  readonly permissions = computed(() =>
    this.rolePermissionService.permissions()
  );
  readonly canCreateAnimals = computed(
    () => this.permissions().canCreateAnimals
  );
  readonly canEditAnimals = computed(() => this.permissions().canEditAnimals);

  constructor() {
    addIcons({
      homeOutline,
      listOutline,
      addOutline,
      mapOutline,
      filterOutline,
      pawOutline,
    });
  }

  async ngOnInit() {
    await this.loadData();
    this.loadFiltersFromQueryParams();
  }

  private async loadData() {
    try {
      this.loading.set(true);

      // Load animals and filter options in parallel
      const [animals, species, regions] = await Promise.all([
        this.animalService.getAllAnimals(),
        this.animalService.getSpeciesList(),
        this.animalService.getRegions(),
      ]);

      this.animals.set(animals);
      this.speciesList.set(species);
      this.regionsList.set(regions);
    } catch (error) {
      console.error('Error loading animal data:', error);
    } finally {
      this.loading.set(false);
    }
  }

  private loadFiltersFromQueryParams() {
    const queryParams = this.route.snapshot.queryParams;

    if (queryParams['species']) {
      this.speciesFilter.set(queryParams['species']);
    }
    if (queryParams['region']) {
      this.regionFilter.set(queryParams['region']);
    }
    if (queryParams['from']) {
      this.fromDate.set(queryParams['from']);
    }
    if (queryParams['to']) {
      this.toDate.set(queryParams['to']);
    }
  }

  onFiltersApplied(filters: FilterValues) {
    this.speciesFilter.set(filters.species);
    this.regionFilter.set(filters.region);
    this.fromDate.set(filters.from);
    this.toDate.set(filters.to);

    this.updateQueryParams();
  }

  onFiltersCleared() {
    this.speciesFilter.set(null);
    this.regionFilter.set(null);
    this.fromDate.set(null);
    this.toDate.set(null);

    this.updateQueryParams();
  }

  private updateQueryParams() {
    const queryParams: any = {};

    if (this.speciesFilter()) queryParams.species = this.speciesFilter();
    if (this.regionFilter()) queryParams.region = this.regionFilter();
    if (this.fromDate()) queryParams.from = this.fromDate();
    if (this.toDate()) queryParams.to = this.toDate();

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'replace',
    });
  }

  goToList() {
    const queryParams: any = {};

    if (this.speciesFilter()) queryParams.species = this.speciesFilter();
    if (this.regionFilter()) queryParams.region = this.regionFilter();
    if (this.fromDate()) queryParams.from = this.fromDate();
    if (this.toDate()) queryParams.to = this.toDate();

    this.router.navigate(['/animal/list'], { queryParams });
  }

  goToSpecificAnimal(animal: Animal) {
    this.router.navigate(['/animal', animal.id]);
  }

  goToEdit(animal: Animal) {
    this.router.navigate(['/animal', animal.id, 'edit']);
  }
}
