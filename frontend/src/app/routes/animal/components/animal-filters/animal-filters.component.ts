import { Component, EventEmitter, Input, Output, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonDatetimeButton,
  IonDatetime,
  IonModal,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { filterOutline, closeCircleOutline } from 'ionicons/icons';

export interface FilterValues {
  species: string | null;
  region: string | null;
  from: string | null;
  to: string | null;
}

@Component({
  selector: 'app-animal-filters',
  templateUrl: './animal-filters.component.html',
  styleUrls: ['./animal-filters.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonDatetimeButton,
    IonDatetime,
    IonModal,
    IonButton,
    IonIcon
  ]
})
export class AnimalFiltersComponent implements OnInit {
  @Input() speciesList: string[] = [];
  @Input() regionsList: string[] = [];
  
  @Input() set initialSpecies(value: string | null) {
    if (value !== this.speciesFilter()) {
      this.speciesFilter.set(value);
    }
  }
  
  @Input() set initialRegion(value: string | null) {
    if (value !== this.regionFilter()) {
      this.regionFilter.set(value);
    }
  }
  
  @Input() set initialFromDate(value: string | null) {
    if (value !== this.fromDate()) {
      this.fromDate.set(value);
    }
  }
  
  @Input() set initialToDate(value: string | null) {
    if (value !== this.toDate()) {
      this.toDate.set(value);
    }
  }
  
  @Output() filtersApplied = new EventEmitter<FilterValues>();
  @Output() filtersCleared = new EventEmitter<void>();
  
  // Filter signals
  speciesFilter = signal<string | null>(null);
  regionFilter = signal<string | null>(null);
  fromDate = signal<string | null>(null);
  toDate = signal<string | null>(null);

  constructor() {
    addIcons({
      filterOutline,
      closeCircleOutline
    });
  }

  ngOnInit() {
    // Component is ready
  }
  
  applyFilters() {
    this.filtersApplied.emit({
      species: this.speciesFilter(),
      region: this.regionFilter(),
      from: this.fromDate(),
      to: this.toDate()
    });
  }
  
  clearFilters() {
    this.speciesFilter.set(null);
    this.regionFilter.set(null);
    this.fromDate.set(null);
    this.toDate.set(null);
    this.filtersCleared.emit();
  }

  onSpeciesChange(event: any) {
    this.speciesFilter.set(event.detail.value);
  }

  onRegionChange(event: any) {
    this.regionFilter.set(event.detail.value);
  }

  onFromDateChange(event: any) {
    this.fromDate.set(event.detail.value);
  }

  onToDateChange(event: any) {
    this.toDate.set(event.detail.value);
  }
}
