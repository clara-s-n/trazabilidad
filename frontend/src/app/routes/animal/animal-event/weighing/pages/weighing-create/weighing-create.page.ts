import {
  Component,
  ChangeDetectionStrategy,
  inject,
  input,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeighingService } from 'src/app/services/events/weighing/weighing.service';
import { WeighingCreate } from 'src/app/model/events/weighing';
import { IonicModule } from '@ionic/angular';
import { WeighingFormComponent } from '../../components/weighing-form/weighing-form.component';
@Component({
  selector: 'app-weighing-create',
  templateUrl: './weighing-create.page.html',
  styleUrls: ['./weighing-create.page.scss'],
  standalone: true,
  imports: [IonicModule, WeighingFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'page-weighing-create' },
})
export class WeighingCreatePage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private weighingService = inject(WeighingService);

  public id = input.required<string>();

  async handleSave(data: WeighingCreate) {
    try {
      await this.weighingService.createWeighing(this.id(), data);
      this.router.navigate([`/animal/events/${this.id()}/weighing`]);
    } catch (err) {
      console.error('Error creando pesaje', err);
    }
  }
}
