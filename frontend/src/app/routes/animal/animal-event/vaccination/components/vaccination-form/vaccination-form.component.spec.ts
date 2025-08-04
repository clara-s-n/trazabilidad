import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VaccinationFormComponent } from './vaccination-form.component';

describe('VaccinationFormComponent', () => {
  let component: VaccinationFormComponent;
  let fixture: ComponentFixture<VaccinationFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [VaccinationFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VaccinationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
