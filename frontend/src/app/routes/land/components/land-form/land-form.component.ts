import {
  Component,
  input,
  output,
  signal,
  effect,
  inject,
  computed,
} from '@angular/core';
import { CreateLand, Land, UpdateLand } from '../../../../model/land';
import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonText,
  IonImg,
  IonIcon,
  IonSpinner,
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { LandsService } from '../../../../services/lands.service';
import { addIcons } from 'ionicons';
import {
  locationOutline,
  businessOutline,
  navigateOutline,
  compassOutline,
  cameraOutline,
  cloudUploadOutline,
  imageOutline,
  saveOutline,
  alertCircleOutline,
  informationCircleOutline,
  documentOutline,
  pencilOutline,
  trashOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-land-form',
  templateUrl: './land-form.component.html',
  styleUrls: ['./land-form.component.scss'],
  imports: [
    IonInput,
    IonGrid,
    FormsModule,
    IonRow,
    IonCol,
    IonButton,
    IonItem,
    IonLabel,
    IonText,
    IonImg,
    IonIcon,
    IonSpinner,
  ],
})
export class LandFormComponent {
  // Make parseFloat available in template
  parseFloat = parseFloat;

  // Recibe un predio para edición; null para creación
  public land = input<Land | null>(null);

  // Señales para cada campo
  public name = signal<string>('');
  public latitude = signal<number | null>(null);
  public longitude = signal<number | null>(null);
  public previewUrl = signal<string | null>(null);
  public selectedFile: File | null = null;

  // Validation signals
  public nameError = signal<string>('');
  public latitudeError = signal<string>('');
  public longitudeError = signal<string>('');
  public isSubmitting = signal<boolean>(false);

  private landsService = inject(LandsService);

  // Emite al hacer submit el payload de creación o actualización
  public submitted = output<CreateLand | UpdateLand>();

  constructor() {
    // Add required icons
    addIcons({
      locationOutline,
      businessOutline,
      navigateOutline,
      compassOutline,
      cameraOutline,
      cloudUploadOutline,
      imageOutline,
      saveOutline,
      alertCircleOutline,
      informationCircleOutline,
      documentOutline,
      pencilOutline,
      trashOutline,
    });

    // Effect to populate form when land input changes
    effect(() => {
      const currentLand = this.land();
      if (currentLand) {
        this.name.set(currentLand.name);
        this.latitude.set(currentLand.latitude);
        this.longitude.set(currentLand.longitude);
        // If land has an image URL, set it as preview
        if (currentLand.imageUrl) {
          this.previewUrl.set(currentLand.imageUrl);
        }
      } else {
        // Reset form for creation
        this.name.set('');
        this.latitude.set(null);
        this.longitude.set(null);
      }
      // Clear errors when land changes
      this.clearErrors();
      // Reset image preview when land changes
      this.previewUrl.set(null);
      this.selectedFile = null;
    });
  }

  private clearErrors() {
    this.nameError.set('');
    this.latitudeError.set('');
    this.longitudeError.set('');
  }

  async validateName() {
    const name = this.name().trim();

    if (!name) {
      this.nameError.set('El nombre es requerido');
      return false;
    }

    if (name.length < 3) {
      this.nameError.set('El nombre debe tener al menos 3 caracteres');
      return false;
    }

    // Check for uniqueness
    const exists = await this.landsService.checkLandNameExists(
      name,
      this.land()?.id
    );
    if (exists) {
      this.nameError.set('Ya existe un predio con este nombre');
      return false;
    }

    this.nameError.set('');
    return true;
  }

  validateLatitude(): boolean {
    const lat = this.latitude();

    if (lat === null || lat === undefined) {
      this.latitudeError.set('La latitud es requerida');
      return false;
    }

    if (lat < -90 || lat > 90) {
      this.latitudeError.set('La latitud debe estar entre -90 y 90');
      return false;
    }

    this.latitudeError.set('');
    return true;
  }

  validateLongitude(): boolean {
    const lng = this.longitude();

    if (lng === null || lng === undefined) {
      this.longitudeError.set('La longitud es requerida');
      return false;
    }

    if (lng < -180 || lng > 180) {
      this.longitudeError.set('La longitud debe estar entre -180 y 180');
      return false;
    }

    this.longitudeError.set('');
    return true;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => this.previewUrl.set(reader.result as string);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeImage() {
    this.selectedFile = null;
    this.previewUrl.set(null);
    // Reset the file input to allow selecting the same file again
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  async onSubmit() {
    if (this.isSubmitting()) return;

    this.isSubmitting.set(true);

    try {
      const nameValid = await this.validateName();
      const latValid = this.validateLatitude();
      const lngValid = this.validateLongitude();

      if (!nameValid || !latValid || !lngValid) {
        return;
      }

      const payload = {
        name: this.name().trim(),
        latitude: this.latitude()!,
        longitude: this.longitude()!,
        file: this.selectedFile,
      } as CreateLand & UpdateLand & { file: File | null };

      this.submitted.emit(payload);
    } finally {
      this.isSubmitting.set(false);
    }
  }

  isFormValid = computed((): boolean => {
    const name = this.name().trim();
    const lat = this.latitude();
    const lng = this.longitude();

    return (
      name.length >= 3 &&
      lat !== null &&
      lat >= -90 &&
      lat <= 90 &&
      lng !== null &&
      lng >= -180 &&
      lng <= 180 &&
      !this.nameError() &&
      !this.latitudeError() &&
      !this.longitudeError()
    );
  });
}
