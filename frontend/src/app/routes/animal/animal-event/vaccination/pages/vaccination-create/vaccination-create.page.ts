import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VaccinationService } from 'src/app/services/events/vaccination/vaccination.service';
import { VaccinationCreate } from 'src/app/model/events/vaccination';
import { IonicModule } from '@ionic/angular';
import { VaccinationFormComponent } from '../../components/vaccination-form/vaccination-form.component';
@Component({
  selector: 'app-vaccination-create',
  templateUrl: './vaccination-create.page.html',
  styleUrls: ['./vaccination-create.page.scss'],
  standalone: true,
  imports: [IonicModule, VaccinationFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page-vaccination-create' },
})
export class VaccinationCreatePage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private vaccinationService = inject(VaccinationService);

  public id = input.required<string>();

  async handleSave(data: VaccinationCreate) {
    try {
      await this.vaccinationService.createVaccination(this.id(), data);
      this.router.navigate([`/animal/events/${this.id()}/vaccination`]);
    } catch (err) {
      console.error('Error creando vacunación', err);
    }
  }
}
